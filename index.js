const { EventEmitter } = require("node:events")
const { WebSocketServer } = require("ws");
class Client extends EventEmitter {
  constructor(options = {}) {
    super()
    this.token = options.token || null
    this.intents = options.intents || null

    //Client Data
    this.user = null
    this.channels = null
    this.users = null
    this.guilds = null
  }

  login(token) {
    if (this?.token === null) {
      if (token === undefined) throw "Token Tidak Ada"
    }
    if (this?.intents === undefined) throw "Intents Harus Terisi"
    const websocket = new WebSocket(this)
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
    this.ws = new WebSocketServer.Server(wssurl);
    
    let sequence = 0;
    function send(op, d) {
      this.ws.send({ op, d });
    }
    
    this.ws.onmessage = ({ data }) => {
      console.log(data)
    }
    this.ws.onopen = () => console.log('websocket opened!');
    this.ws.onclose = this.ws.onerror = (e) => {
      console.log(e);
    }
    /*
    const WebSocket = require('ws'); //npmjs.org/ws
    const zlib = require('node:zlib');
    const erlpack = require('erlpack'); // github.com/discordapp/erlpack

    const versionGATEWAY = '10'
    // https://discordapi.com/topics/gateway#gateway-opcodespayloads
    const OPCodes = {
      HEARTBEAT: 1,
      IDENTIFY: 2,
      HELLO: 10,
      HEARTBEAT_ACK: 11,
    };

    // zlib inflate context for zlib-stream
    const inflate = new zlib.Inflate({
      chunkSize: 65535,
      flush: zlib.constants.Z_SYNC_FLUSH,
    });

    // create websocket (technically you should perform a GET to /api/gateway and use the response)
    const ws = new WebSocket(`wss://gateway.discord.gg/?v=${versionGATEWAY}&encoding=etf&compress=zlib-stream`);

    // sequence used for sessions and heartbeats
    let sequence = 0;

    function send(op, d) {
      ws.send(erlpack.pack({ op, d }));
    }


    ws.onmessage = ({ data }) => {
      const l = data.length;
      // if data.length >= 4 and data ends with Z_SYNC_FLUSH constant
      const flush = l >= 4 &&
        data[l - 4] === 0x00 &&
        data[l - 3] === 0x00 &&
        data[l - 2] === 0xFF &&
        data[l - 1] === 0xFF;

      inflate.push(data, flush && zlib.constants.Z_SYNC_FLUSH);

      if (!flush) return;

      // parse packet with erlpack after its inflated
      const packet = erlpack.unpack(inflate.result);

      // keep track of sequence for heartbeats
      if (packet.s) sequence = packet.s;

      // handle gateway ops
      switch (packet.op) {
        case OPCodes.HELLO:
          console.log('Got op 10 HELLO');
          // set heartbeat interval
          setInterval(() => send(OPCodes.HEARTBEAT, sequence), packet.d.heartbeat_interval);
          // https://discordapi.com/topics/gateway#gateway-identify
          send(OPCodes.IDENTIFY, {
            // you should put your token here _without_ the "Bot" prefix
            token: this?.token,
            properties: {
              $os: "Lumine.js",
              $browser: 'Lumine.js',
              $device: "linux",
            },
            compress: false,
            intents: this?.intents
          });
      }

      // handle gateway packet types
      if (!packet.t) return;
      switch (packet.t) {
        // we should get this after we send identify
        case 'READY':
          console.log('ready as', packet.d.user);
          this.client.emit("ready", packet.d.user)
          break;
      }
    };

    ws.onopen = () => console.log('websocket opened!');
    ws.onclose = ws.onerror = (e) => {
      console.log(e);
    };*/
  }
}

module.exports = {
  Client: Client
}
