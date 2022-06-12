//========== STRUCTURE DATA
const Constants = require("./../util/constants.js")
const CommandInputInteraction = require("./../structure/ChatInputInteraction.js")
//const ButtonInteraction = require('./../structure/ButtonInteraction.js')

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
    if (options?.presence) {
      this.presence = validationPresence(options?.presence)
    } else {
      this.presence = null;
    }

    function validationPresence(presenceObject) {
      var presence = presenceObject

      if (presence?.activity) {
        switch (presence.activity.type.toLowerCase()) {
          case "playing":
            presence.activity.type = Constants.Status.Playing
            break;
          case "streaming":
            presence.activity.type = Constants.Status.Streaming
            break;
          case "listening":
            presence.activity.type = Constants.Status.Listening
            break;
          case "watching":
            presence.activity.type = Constants.Status.Watching
            break;
          case "custom":
            presence.activity.type = Constants.Status.Custom
            break;
          case "competing":
            presence.activity.type = Constants.Status.Competing
            break;
        }
        presence.activities = [presence.activity]
      }
      return presence
    }


    //Client Data
    this.user = null;
    this.channels = null;
    this.users = null;
    this.guilds = null;
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
    if(!guildid) {
      this.requestAPI("POST", Constants.ENDPOINTS.GLOBAL_COMMANDS(this.id), commandsarray)
    } else {
      this.requestAPI("POST", Constants.ENDPOINTS.GUILD_COMMANDS(this.id, guildid), commandsarray)
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
    this.ws = new WebSocket(wssurl);

    let sequence = 0;
    this.ws.onopen = () => console.log('websocket opened!');
    this.ws.onclose = this.ws.onerror = (e) => {
      console.log(e);
    }
    this.ws.onmessage = ({ data }) => {
      let packet = JSON.parse(data)
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

      if (this.presence) BotObjectLogin.presence = this.presence

      switch (packet.op) {
        case OPCodes.HELLO:
          console.log('Got op 10 HELLO');
          // set heartbeat interval
          if (packet.s) sequence = packet.s;
          setInterval(() => this.sendWebsocket(OPCodes.HEARTBEAT, sequence), packet.d.heartbeat_interval);
          // https://discordapi.com/topics/gateway#gateway-identify
          this.sendWebsocket(OPCodes.IDENTIFY, BotObjectLogin);
      }

      // handle gateway packet types
      if (!packet.t) return;
      switch (packet.t) {
        // we should get this after we send identify
        case 'READY':
          var user = packet.d.user
          this.id = user.id
          this.username = user.username
          console.log('ready as', packet.d.user);
          this.emit("ready", packet.d.user)
          break;
        case 'INTERACTION_CREATE':
          if (packet.d.type === 2 && packet.d.data.type === 1) {
            this.emit('interactionCreate', new CommandInputInteraction(packet.d, this))
            this.emit('ChatInputInteraction', new CommandInputInteraction(packet.d, this))
          }
          
          /*if(packet.d.type === 3) {
            this.emit('interactionCreate', new ButtonInteraction(packet.d, this))
            this.emit('ButtonInteraction', new ButtonInteraction(packet.d, this))
          }*/
          break;
      }
    };
  }

  sendWebsocket(op, d) {
    this.ws.send(JSON.stringify({ op: op, d: d }));
  }

  requestAPI(method = "", params = "", data) {
    let object = {
      method: method,
      url: "https://discord.com/api/v10" + params,
      headers: {
        Authorization: `Bot ${this.token}`,
      }
    }
    
    if(data) object.data = data
      
    return axios(object).then(x => "").catch(err => {
      if(err.response.status === 400) {
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
}

module.exports = Client
