const BaseInteraction = require("./BaseInteraction.js")
const OptionsManager = require("./../cache/CommandOptions.js")
const APIDiscord = require("./../util/APIDiscord.js")
const Constants = require("./../util/constants.js")
class ChatInputInteraction extends BaseInteraction {
  constructor(options = {}, client) {
    super()
    
    this.client = client || null;

    this.rawdata = options
    this.name = options?.data?.name || null
    this.description = options?.data?.description || null
    this.name_localizations = options?.data?.name_localizations || null
    this.description_localizations = options?.data?.description_localizations || null
    this.options = new OptionsManager(options?.data?.options)
    this.token = options?.token || null
    this.id = options?.id || null
  }
  
  reply(msgdata) {
    APIDiscord("POST", Constants.ENDPOINTS.RESPOND_INTERACTION(this.id, this.token), this.client.token, {
      type:4,
      data:msgdata
    })
  }
  
  deferReply(msgdata) {
    
  }
}

module.exports = ChatInputInteraction
