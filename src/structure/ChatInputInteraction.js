//========== STRUCTURE DATA
const BaseInteraction = require("./BaseInteraction.js")
const OptionsManager = require("./../cache/CommandOptions.js")
const Constants = require("./../util/constants.js")

//========== CLASS
class ChatInputInteraction extends BaseInteraction {
  constructor(options, client) {
    super()
    
    this.client = client || null;
    
    var daneta = JSON.parse(JSON.stringify(options))
    this.rawdata = options
    this.name = daneta?.data?.name || null
    this.description = daneta?.data?.description || null
    this.name_localizations = daneta?.data?.name_localizations || null
    this.description_localizations = daneta?.data?.description_localizations || null
    this.options = new OptionsManager(daneta?.data?.options)
    this.token = daneta?.token || null
    this.id = daneta?.id || null
  }
  
  reply(msgdata) {
    this.client.requestAPI("POST", Constants.ENDPOINTS.RESPOND_INTERACTION(this.id, this.token), {
      type:4,
      data:msgdata
    })
  }
  
  deferReply() {
    this.client.requestAPI("POST", Constants.ENDPOINTS.RESPOND_INTERACTION(this.id, this.token), {
      type:5
    })
  }
  
  followUp() {
    
  }
  
  editReply(msgdata) {
    this.client.requestAPI("PATCH", Constants.ENDPOINTS.EDIT_INTERACTION(this.id, this.token), msgdata)
  }
}

module.exports = ChatInputInteraction
