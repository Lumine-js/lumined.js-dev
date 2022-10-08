//========== STRUCTURE DATA
const BaseInteraction = require("./BaseInteraction.js")
const Constants =  require("./../util/constants.js")

//========== CLASS
class AutocompleteInteraction extends BaseInteraction {
  constructor(options, client) {
    super()
    
    this.client = client || null;
    
    var daneta = JSON.parse(JSON.stringify(options))
    //this.rawdata = options
    this.name = daneta?.data?.name || null
    this.description = daneta?.data?.description || null
    this.locale = daneta?.locale || null
    this.guildLocale = daneta?.guild_locale || null
    this.guildId = daneta?.guild_id || null
    this.channelId = daneta?.channel_id || null
    this.authorId = daneta?.member?.user?.id || null
    this.options = daneta?.data?.options || []
    this.token = daneta?.token || null
    this.id = daneta?.id || null
    this.applicationId = daneta?.application_id || null
  }
  
  respond(options = []) {
    this.client.requestAPI("POST", Constants.ENDPOINTS.RESPOND_INTERACTION(this.id, this.token), {
      type:8,
      data:{
        choices: options || []
      }
    })
  }
  
  getFocused() {
    return this.options.find(x => x.focused === true).value || null
  }
  
  getSubcommandGroup(key, required = false) {
    return this.options.find(x => x.type === Constants.CommandOptionType("SUB_COMMAND_GROUP"))?.name || null
  }
  
  getSubcommand() {
    return this.options.find(x => x.type === Constants.CommandOptionType("SUB_COMMAND"))?.name || this.options[0]?.options.find(x => x.type === Constants.CommandOptionType("SUB_COMMAND"))?.name || null
  }
  
  getString(key, required = false) {
    return this.options.find(x => (x.name === key && x.type === Constants.CommandOptionType("STRING")))?.value || this.options[0]?.options.find(x => (x.name === key && x.type === Constants.CommandOptionType("STRING")))?.value || this.options[0]?.options[0]?.options.find(x => (x.name === key && x.type === Constants.CommandOptionType("STRING")))?.value || null
  }
  
  getNumber(key, required = false) {
    return this.options.find(x => (x.name === key && x.type === Constants.CommandOptionType("NUMBER")))?.value || this.options[0]?.options.find(x => (x.name === key && x.type === Constants.CommandOptionType("NUMBER")))?.value || this.options[0]?.options[0]?.options.find(x => (x.name === key && x.type === Constants.CommandOptionType("NUMBER")))?.value || null
  }
  
  getBoolean(key, required = false) {
  return this.options.find(x => (x.name === key && x.type === Constants.CommandOptionType("BOOLEAN")))?.value || this.options[0]?.options.find(x => (x.name === key && x.type === Constants.CommandOptionType("BOOLEAN")))?.value || this.options[0]?.options[0]?.options.find(x => (x.name === key && x.type === Constants.CommandOptionType("BOOLEAN")))?.value || null
  }
  
  getInteger(key, required = false) {
    return this.options.find(x => (x.name === key && x.type === Constants.CommandOptionType("INTEGER")))?.value || this.options[0]?.options.find(x => (x.name === key && x.type === Constants.CommandOptionType("INTEGER")))?.value || this.options[0]?.options[0]?.options.find(x => (x.name === key && x.type === Constants.CommandOptionType("INTEGER")))?.value || null
  }
  
  getAttachment(key, required = false) {
    return this.options.find(x => (x.name === key && x.type === Constants.CommandOptionType("ATTACH")))?.value || this.options[0]?.options.find(x => (x.name === key && x.type === Constants.CommandOptionType("ATTACH")))?.value || this.options[0]?.options[0]?.options.find(x => (x.name === key && x.type === Constants.CommandOptionType("ATTACH")))?.value || null
  }
  
  getChannel(key, required = false) {
    return this.options.find(x => (x.name === key && x.type === Constants.CommandOptionType("CHANNEL")))?.value || this.options[0]?.options.find(x => (x.name === key && x.type === Constants.CommandOptionType("CHANNEL")))?.value || this.options[0]?.options[0]?.options.find(x => (x.name === key && x.type === Constants.CommandOptionType("CHANNEL")))?.value || null
  }
  
  getUser(key, required = false) {
    return this.options.find(x => (x.name === key && x.type === Constants.CommandOptionType("USER")))?.value || this.options[0]?.options.find(x => (x.name === key && x.type === Constants.CommandOptionType("USER")))?.value || this.options[0]?.options[0]?.options.find(x => (x.name === key && x.type === Constants.CommandOptionType("USER")))?.value || null
  }
  
  getMentionable(key, required = false) {
    return this.options.find(x => (x.name === key && x.type === Constants.CommandOptionType("MENTIONABLE")))?.value || this.options[0]?.options.find(x => (x.name === key && x.type === Constants.CommandOptionType("MENTIONABLE")))?.value || this.options[0]?.options[0]?.options.find(x => (x.name === key && x.type === Constants.CommandOptionType("MENTIONABLE")))?.value || null
  }
  
  getRole(key, required = false) {
    return this.options.find(x => (x.name === key && x.type === Constants.CommandOptionType("ROLE")))?.value || this.options[0]?.options.find(x => (x.name === key && x.type === Constants.CommandOptionType("ROLE")))?.value || this.options[0]?.options[0]?.options.find(x => (x.name === key && x.type === Constants.CommandOptionType("ROLE")))?.value || null
  }
}

module.exports = AutocompleteInteraction
