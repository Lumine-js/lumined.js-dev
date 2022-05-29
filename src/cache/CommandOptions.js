const OptionsType = require("./../util/constants.js").OptionType
class CommandOptions {
  constructor(options) {
    this.options = options || null
  }
  
  getSubcommandGroup(key, required = false) {
    return this.options.find(x => x.name === key && x.type === OptionsType.SUB_COMMAND_GROUP).value || null
  }
  
  getSubcommand(key, required = true) {
    return this.options.find(x => x.name === key && x.type === OptionsType.SUB_COMMAND).value || null
  }
  
  getString(key, required = false) {
    return this.options.find(x => x.name === key && x.type === OptionsType.STRING).value || null
  }
  
  getNumber(key, required = false) {
    return this.options.find(x => x.name === key && x.type === OptionsType.NUMBER).value || null
  }
  
  getBoolean(key, required = false) {
  return this.options.find(x => x.name === key && x.type === OptionsType.BOOLEAN).value || null
  }
  
  getInteger(key, required = false) {
    return this.options.find(x => x.name === key && x.type === OptionsType.INTEGER).value || null
  }
  
  getAttachment(key, required = false) {
    return this.options.find(x => x.name === key && x.type === OptionsType.ATTACHMENT).value || null 
  }
  
  getChannel(key, required = false) {
    return this.options.find(x => x.name === key && x.type === OptionsType.CHANNEL).value || null
  }
  
  getUser(key, required = false) {
    return this.options.find(x => x.name === key && x.type === OptionsType.USER).value || null
  }
  
  getMentionable(key, required = false) {
    return this.options.find(x => x.name === key && x.type === OptionsType.MENTIONABLE).value || null
  }
  
  getRole(key, required = false) {
    return this.options.find(x => x.name === key && x.type === OptionsType.ROLE).value || null
  }
}

module.exports = CommandOptions
