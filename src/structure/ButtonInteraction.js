//========== STRUCTURE DATA
const BaseInteraction = require("./BaseInteraction.js")
const Constants = require("./../util/constants.js")

//========== CLASS
class ButtonInteraction extends BaseInteraction {
  constructor(options, client) {
    super()

    this.client = client || null;

    var daneta = JSON.parse(JSON.stringify(options))
    this.rawdata = options
    this.token = daneta?.token || null
    this.id = daneta?.id || null
    this.messageId = daneta?.message?.id
    this.userId = daneta?.member?.id
    this.channelId = daneta?.channel_id
    this.guildId = daneta?.guild_id
    this.locale = daneta?.locale
    this.guildLocale = daneta?.guild_locale
  }

  async reply(msgdata) {
    await this.client.requestAPI("POST", Constants.ENDPOINTS.RESPOND_INTERACTION(this.id, this.token), {
      type: 4,
      data: msgdata
    })
  }

  async deferUpdate() {
    await this.client.requestAPI("POST", Constants.ENDPOINTS.RESPOND_INTERACTION(this.id, this.token), {
      type: 6
    })
  }

  async showModal(modaldata) {
    await this.client.requestAPI("POST", Constants.ENDPOINTS.RESPOND_INTERACTION(this.id, this.token), {
      type:9,
      data:modaldata
    })
  }
}

module.exports = ButtonInteraction
