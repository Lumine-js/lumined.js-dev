const { EventEmitter } = require("node:events")
const WebSocket = require("ws");
class Client extends EventEmitter {
  constructor(options = {}) {
    super()

    this.token = options?.token || null;
    this.intents = options?.intents || null;

    //Client Data
    this.user = null;
    this.channels = null;
    this.users = null;
    this.guilds = null;
  }

  login(token) {
    console.log('Intents ' + this.intents)
    if (this.token === null) {
      if (!token) throw new Error("Token Tidak Ada")
    }
    if (this.intents === null) throw new Error("Intents Harus Terisi")
    this.startWebsocket()
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
      console.log(packet)
      switch(packet.op) {
        case OPCodes.HELLO:
          console.log('Got op 10 HELLO');
          // set heartbeat interval
          if(packet.s) sequence = packet.s;
          setInterval(() => this.sendWebsocket(OPCodes.HEARTBEAT, sequence), packet.d.heartbeat_interval);
          // https://discordapi.com/topics/gateway#gateway-identify
          this.sendWebsocket(OPCodes.IDENTIFY, {
            // you should put your token here _without_ the "Bot" prefix
            token: this.token,
            properties: {
              $os: "Lumine.js",
              $browser: 'Lumine.js',
              $device: "linux",
            },
            intents: this.intents
          });
      }

      // handle gateway packet types
      if(!packet.t) return;
      switch (packet.t) {
        // we should get this after we send identify
        case 'READY':
          console.log('ready as', packet.d.user);
          this.emit("ready", packet.d.user)
          break;
      }
    };
  }
  sendWebsocket(op, d) {
    this.ws.send(JSON.stringify({op: op,d: d }));
  }
}

module.exports = {
  Client: Client
}
