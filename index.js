const { EventEmitter } = require("node:events")
const { WebSocket } = require('./src/core/WebSocket.js')
class Client extends EventEmitter {
  constructor(options = {}) {
    this.token = options.token || null
    this.intents = options.intents || null
  }

  login(token) {
    if(this?.token === null) {
      if(token === undefined) throw new Error("Token Tidak Ada")
    }
    if (this?.intents === undefined) throw new Error("Intents Harus Terisi")
    const websocket = new WebSocket(this)
    websocket.start()
  }
}

module.exports = {
  Client: Client
}
