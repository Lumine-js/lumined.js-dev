//========== STRUCTURE DATA
const Constants = require("./../util/Constants.js")
const CommandInputInteraction = require("./../structure/ChatInputInteraction.js")
const UserClient = require("./../structure/UserClient.js")
const ButtonInteraction = require('./../structure/ButtonInteraction.js')
const AutocompleteInteraction = require('./../structure/AutocompleteInteraction.js')

const Guild = require('./../structure/Guild.js')
const GuildManager = require('./../manager/GuildManager.js')
//========== PACKAGE
const { EventEmitter } = require("node:events")
const axios = require('axios')
const WebSocket = require("ws");
const clc = require("cli-color")

//========= CLASS
class Client extends EventEmitter {

  #token;
  #intents;
  #loginActivity
  
  constructor(options = {}) {
    super()
    this.#token = options?.token || null;
    this.#intents = options?.intents || null
    this.#loginActivity = {
      activities: options?.activities || [],
      status: options?.status || "online"
    }

    this.ws = null
    this.user = null

    //CacheManager
    this.channels = []
    this.guilds = new GuildManager()
    this.members = []
  }

  login(token) {
    if (this.#token === null) {
      if (!token) throw new Error("Token Tidak Ada")
      this.#token = token
    }
    if (this.ws) {
      throw new Error('Client Already Run')
    }
    if (this.#intents === null) throw new Error("Intents Harus Terisi")
    this.startWebsocket()
  }

  destroy() {
    return this.ws.close()
  }

  async updateCommands(commandsarray, guildid) {
    if (!guildid) {
      await this.requestAPI("PUT", Constants.ENDPOINTS.GLOBAL_COMMANDS(this.user.id), commandsarray)
    } else {
      await this.requestAPI("PUT", Constants.ENDPOINTS.GUILD_COMMANDS(this.user.id, guildid), commandsarray)
    }
  }

  async startWebsocket() {
    let wssurl = `wss://gateway.discord.gg/?v=10&encoding=json`
    const OPCodes = {
      HEARTBEAT: 1,
      IDENTIFY: 2,
      HELLO: 10,
      HEARTBEAT_ACK: 11,
    };

    let BotObjectLogin = {
      // you should put your token here _without_ the "Bot" prefix
      token: this.#token,
      properties: {
        $os: "Lumine.js",
        $browser: 'Lumine.js',
        $device: "linux",
      },
      intents: this.#intents
    }
    if (this.#loginActivity) BotObjectLogin.presence = this.#loginActivity

    if (!this.wsUrl) {
      this.ws = new WebSocket(wssurl)
      this.wsUrl = wssurl
    }

    let sequence = 0;

    if (!this?.wsUrl === wssurl) {
      this.ws.onclose = this.ws.onerror = (e) => {
        this.ws = null
        this.emit("moduleLogging", 'Try To Reconnect')
        this.startWebsocket()
      }
    } else {
      this.ws.onopen = () => {
        this.emit("moduleLogging", 'Lumine.js Connected To Websocket')
      }
    }

    this.ws.onmessage = async ({ data }) => {
      let packet = JSON.parse(data)

      //Eksekusi Dasar Pemindahan
      if ((packet?.d?.resume_gateway_url) && (this.wsUrl === wssurl)) {
        await this.ws.close()
        this.ws = new WebSocket(packet.d.resume_gateway_url)
        this.wsUrl = packet.d.resume_gateway_url
        this.emit("moduleLogging", 'Lumine.js Change To Regional Websocket')
        return this.startWebsocket()
      } else {
        switch (packet.op) {
          case OPCodes.HELLO:
            // set heartbeat interval
            if (packet.s) sequence = packet.s;
            setInterval(() => this.sendWebsocket(OPCodes.HEARTBEAT, sequence), packet.d.heartbeat_interval - 3000);
            // https://discordapi.com/topics/gateway#gateway-identify
            this.sendWebsocket(OPCodes.IDENTIFY, BotObjectLogin);
        }

        // handle gateway packet types
        if (!packet?.t) return;
        this.emit('rawEvent', { t: packet.t, d: packet.d })
        switch (packet.t) {
          // we should get this after we send identify
          case 'READY':

            //Pendefinisian
            this.user = new UserClient(packet.d)
            this.guilds = new GuildManager(packet.d.guilds)
            this.emit("ready", this.user)
            const packg = require("./../../package.json")
            console.log(`Bot ${clc.bold.blue(this.user.username)} telah aktif, \nKamu menggunakan ${clc.yellow.bold(packg.name)} versi ${packg.version}.\nDokumentasi bisa diperiksa pada \n${clc.blue(`https://github.com/Lumine-js/${packg.name}`)}\n\n\n\n`)
            break;
          case 'INTERACTION_CREATE':
            if (packet.d.type === 2 && packet.d.data.type === 1) {
              this.emit('interactionCreate', new CommandInputInteraction(packet.d, this))
              this.emit('ChatInputInteraction', new CommandInputInteraction(packet.d, this))
            }

            if (packet.d.type === 3 && packet.d.data.type === 2) {
              this.emit('interactionCreate', new ButtonInteraction(packet.d, this))
              this.emit('ButtonInteraction', new ButtonInteraction(packet.d, this))
            }

            if (packet.d.type === 4) {
              this.emit('interactionCreate', new AutocompleteInteraction(packet.d, this))
              this.emit('Autocomplete', new AutocompleteInteraction(packet.d, this))
            }
            break;
          case "GUILD_CREATE":
            this.guilds.cache.set(packet.d.id, packet.d)
            this.emit("guildCreate", new Guild(packet.d))
        }
      };
    }
  }

  async sendWebsocket(op, d) {
    this.ws.send(JSON.stringify({ op: op, d: d }));
  }

  async requestAPI(method = "", params = "", data, headers) {
    let object = {
      method: method,
      url: "https://discord.com/api/v10" + params,
      headers: {
        Authorization: `Bot ${this.#token}`
      }
    }

    if (headers) {
      object.headers = headers
      object.headers.Authorization = `Bot ${this.#token}`
    }

    if (data) object.data = data


    return axios(object).then(x =>
    {
      return x.data
    }).catch(err => {
      if (err.response.status === 400) {
        var DiscordERROR = err.response.data
        throw new Error('DiscordApiError : ' + `{
                    code: ${DiscordERROR.code},
                    message: ${DiscordERROR.message},
                    error: ${JSON.stringify(DiscordERROR.errors)},
                    url: ${object.url}
                  }`)
      } else if (err.response.status === 429) {
        throw new Error("You have submitted too many requests")
        } else {
        throw new Error(err)
      }
    })
  }

  async sendMessage(id, content) {
    return this.requestAPI("POST", Constants.ENDPOINTS.CREATE_MESSAGE(id), content).then(x => x)
  }

  async getGuildWebhooks(guildid) {
    if (guildid.length === 0) throw new Error("Guild ID Tidak Ada")
    return this.requestAPI("GET", Constants.ENDPOINTS.GUILD_WEBHOOK(guildid)).then(x => x)
  }
  async getChannelWebhooks(channelid) {
    if (channelid.length === 0) throw new Error("Channel ID Tidak Ada")
    return this.requestAPI("GET", Constants.ENDPOINTS.CHANNEL_WEBHOOK(channelid)).then(x => x)
  }
  async createWebhook(channelid, data) {
    if (channelid.length === 0) throw new Error("Channel ID Tidak Ada")
    return this.requestAPI("GET", Constants.ENDPOINTS.CHANNEL_WEBHOOK(channelid), data).then(x => x)
  }

  async getWebhook(webhookid) {
    if (webhookid.length === 0) throw new Error("Webhook ID Tidak Ada")
    return this.requestAPI("GET", Constants.ENDPOINTS.WEBHOOK(webhookid)).then(x => x)
  }

  async editWebhook(webhookid, data) {
    if (webhookid.length === 0) throw new Error("Webhook ID Tidak Ada")
    return this.requestAPI("PATCH", Constants.ENDPOINTS.WEBHOOK(webhookid), data).then(x => x)
  }

  async deleteWebhook(webhookid) {
    if (webhookid.length === 0) throw new Error("Webhook ID Tidak Ada")
    return this.requestAPI("DELETE", Constants.ENDPOINTS.WEBHOOK(webhookid)).then(x => x)
  }

  async sendMessageWebhook(webhookid, webhooktoken, content) {
    if (webhookid.length === 0) throw new Error("Webhook ID Tidak Ada")
    if (webhooktoken.length === 0) throw new Error("Webhook Token Tidak Ada")
    return this.requestAPI("POST", Constants.ENDPOINTS.SEND_WEBHOOK(webhookid, webhooktoken), content).then(x => x)
  }

  async getUser(userid = "") {
    if (userid.length === 0) throw new Error("User ID Tidak Ada")
    return this.requestAPI("GET", Constants.ENDPOINTS.USER(userid)).then(x => x)
  }

  async getChannel(channelid = "") {
    if (channelid.length === 0) throw new Error("Channel ID Tidak Ada")
    return this.requestAPI("GET", Constants.ENDPOINTS.CHANNEL(channelid)).then(x => x)
  }

  async getGuild(guildid = "") {
    if (id.length === 0) throw new Error("Guild ID Tidak ada")
    return this.requestAPI("GET", Constante.EDNPOINTS.GUILD(guildid))
  }
}

module.exports = Client