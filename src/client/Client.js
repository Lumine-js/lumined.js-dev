//========== STRUCTURE DATA
const Constants = require("./../util/constants.js")
const CommandInputInteraction = require("./../structure/ChatInputInteraction.js")
const UserClient = require("./../structure/UserClient.js")
const ButtonInteraction = require('./../structure/ButtonInteraction.js')
const AutocompleteInteraction = require('./../structure/AutocompleteInteraction.js')
//========== PACKAGE
const { EventEmitter } = require("node:events")
const axios = require('axios')
const WebSocket = require("ws");

//========= CLASS
class Client extends EventEmitter {
  constructor(options = {}) {
    super()

    this.token = options?.token || null;
    this.intents = options?.intents || null;

    this.loginActivity = {
      activities: options?.activities || [],
      status: options?.status || "online"
    }
    this.ws = null
  }

  login(token) {
    if (this.token === null) {
      if (!token) throw new Error("Token Tidak Ada")
    }
    if (this.intents === null) throw new Error("Intents Harus Terisi")
    this.startWebsocket()
  }

  destroy() {
    return this.ws.destroy()
  }

  postCommand(commandsarray, guildid) {
    if (!guildid) {
      this.requestAPI("PUT", Constants.ENDPOINTS.GLOBAL_COMMANDS(this.id), commandsarray)
    } else {
      this.requestAPI("PUT", Constants.ENDPOINTS.GUILD_COMMANDS(this.user.id, guildid), commandsarray)
    }
  }

  startWebsocket() {
    let wssurl = `wss://gateway.discord.gg/?v=10&encoding=json`
    const OPCodes = {
      HEARTBEAT: 1,
      IDENTIFY: 2,
      HELLO: 10,
      HEARTBEAT_ACK: 11,
    };

    let BotObjectLogin = {
      // you should put your token here _without_ the "Bot" prefix
      token: this.token,
      properties: {
        $os: "Lumine.js",
        $browser: 'Lumine.js',
        $device: "linux",
      },
      intents: this.intents
    }
    if (this.loginActivity) BotObjectLogin.presence = this.loginActivity

    if (!this.ws) {
      this.ws = new WebSocket(wssurl)
    }

    let sequence = 0;
    this.ws.onopen = () => console.log('Lumine.js Connected To  Websocket');

    this.ws.onclose = this.ws.onerror = (e) => {
      this.ws = null
      console.log(' Reconnect...')
      this.startWebsocket()
    }

    this.ws.onmessage = async ({ data }) => {
      let packet = JSON.parse(data)

      //Eksekusi Dasar Pemindahan
      if (packet?.d?.resume_gateway_url) {
        await this.destroy()
        this.ws = new WebSocket(packet.d.resume_gateway_url)
        console.log('Lumine.js Change To Regional Websocket');
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
            this.user = new UserClient(packet.d)
            this.emit("ready", new UserClient(packet.d, this))
            const packg = require("./../../package.json")
            console.log(`====== Lumine.js (Project)\n${packg.name} - ${packg.version}\n\nNow Login To ${new UserClient(packet.d, this).username}\n======`)
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
        }
      };
    }
  }

  sendWebsocket(op, d) {
    this.ws.send(JSON.stringify({ op: op, d: d }));
  }

  requestAPI(method = "", params = "", data, headers) {
    let object = {
      method: method,
      url: "https://discord.com/api/v10" + params,
      headers: {
        Authorization: `Bot ${this.token}`
      }
    }

    if (headers) {
      object.headers = headers
      object.headers.Authorization = `Bot ${this.token}`
    }

    if (data) object.data = data

    return axios(object).then(x =>
    {
      return x.data
    }).catch(err => {
      if (err.response.status === 400) {
        var DiscordERROR = err.response.data
        console.log('DiscordApiError : ' + `{
          "code": ${DiscordERROR.code},
          "message": ${DiscordERROR.message},
          "error": ${JSON.stringify(DiscordERROR.errors)},
          "url": ${object.url}
        }`)
      }

    })
  }

  async getUser(userid = "") {
    if (userid.length === 0) throw new Error("User ID Tidak Ada")
    return this.requestAPI("GET", Constants.ENDPOINTS.USER(userid))
  }

  async getChannel(channelid = "") {
    if (channelid.length === 0) throw new Error("Channel ID Tidak Ada")
    return this.requestAPI("GET", Constants.ENDPOINTS.CHANNEL(channelid))
  }
}

module.exports = Client
