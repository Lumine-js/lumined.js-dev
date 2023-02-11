"use strict";

//========== STRUCTURE DATA
const BaseInteraction = require("./BaseInteraction.js")
const Constants =  require("./../util/Constants.js")

//========== CLASS
class ChatInputInteraction extends BaseInteraction {
  constructor(options, client) {
    super()
    
    this.client = client || null;
    
    var daneta = JSON.parse(JSON.stringify(options))
    //this.rawdata = options
    this.name = daneta.data.name ? daneta.data.name : null
    this.description = daneta.data.description ? daneta.data.description : null
    this.locale = daneta.locale ? daneta.locale : null
    this.guildLocale = daneta.guild_locale ? daneta.guild_locale : null
    this.guildId = daneta.guild_id ? daneta.guild_id : null
    this.channelId = daneta.channel_id ? daneta.channel_id : null
    this.authorId = daneta.member.user.id ? daneta.member.user.id : null
    this.options = daneta.data.options ? daneta.data.options : []
    this.token = daneta.token ? daneta.token : null
    this.id = daneta.id ? daneta.id : null
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
  
  followUp(msgdata) {
    this.client.requestAPI("POST", Constants.ENDPOINTS.FOLLOWUP_INTERACTION(this.client.user.id, this.token), msgdata)
  }
  
  editReply(msgdata) {
    this.client.requestAPI("PATCH", Constants.ENDPOINTS.EDIT_INTERACTION(this.client.user.id, this.token), msgdata)
  }
  
  showModal(modaldata) {
    this.client.requestAPI("POST", Constants.ENDPOINTS.RESPOND_INTERACTION(this.id, this.token), {
      type:9,
      data:modaldata
    })
  }
  
  getSubcommandGroup() {
    return this.options.find(x => x.type === Constants.CommandOptionType("SUB_COMMAND_GROUP")).name ? this.options.find(x => x.type === Constants.CommandOptionType("SUB_COMMAND_GROUP")).name : null;
  }
  
  getSubcommand() {
    return this.options.find(x => x.type === Constants.CommandOptionType("SUB_COMMAND")).name ? this.options.find(x => x.type === Constants.CommandOptionType("SUB_COMMAND")).name : this.options[0]?.find(x => x.type === Constants.CommandOptionType("SUB_COMMAND")).name ? this.options[0].options.find(x => x.type === Constants.CommandOptionType("SUB_COMMAND")).name : null;
  }
  
  getString(key) {
    return this.options.find(x => x.name === key && x.type === Constants.CommandOptionType("STRING")) ? this.options.find(x => x.name === key && x.type === Constants.CommandOptionType("STRING")).value : this.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("STRING")) ? this.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("STRING")).value : this.options[0]?.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("STRING")) ? this.options[0]?.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("STRING")).value : null;
  }
  
  getNumber(key) {
    return this.options.find(x => x.name === key && x.type === Constants.CommandOptionType("NUMBER")) ? this.options.find(x => x.name === key && x.type === Constants.CommandOptionType("NUMBER")).value : this.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("NUMBER")) ? this.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("NUMBER")).value : this.options[0]?.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("NUMBER")) ? this.options[0]?.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("NUMBER")).value : null;
  }
  
  getBoolean(key) {
    return this.options.find(x => x.name === key && x.type === Constants.CommandOptionType("BOOLEAN")) ? this.options.find(x => x.name === key && x.type === Constants.CommandOptionType("BOOLEAN")).value : this.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("BOOLEAN")) ? this.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("BOOLEAN")).value : this.options[0]?.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("BOOLEAN")) ? this.options[0]?.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("BOOLEAN")).value : null;
  }
  
  getInteger(key) {
    return this.options.find(x => x.name === key && x.type === Constants.CommandOptionType("INTEGER")) ? this.options.find(x => x.name === key && x.type === Constants.CommandOptionType("INTEGER")).value : this.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("INTEGER")) ? this.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("INTEGER")).value : this.options[0]?.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("INTEGER")) ? this.options[0]?.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("INTEGER")).value : null;
  }
  
  getAttachment(key) {
    return this.options.find(x => x.name === key && x.type === Constants.CommandOptionType("ATTACHMENT")) ? this.options.find(x => x.name === key && x.type === Constants.CommandOptionType("ATTACHMENT")).value : this.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("ATTACHMENT")) ? this.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("ATTACHMENT")).value : this.options[0]?.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("ATTACHMENT")) ? this.options[0]?.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("ATTACHMENT")).value : null;
  }
  
  getChannel(key) {
    return this.options.find(x => x.name === key && x.type === Constants.CommandOptionType("CHANNEL")) ? this.options.find(x => x.name === key && x.type === Constants.CommandOptionType("CHANNEL")).value : this.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("CHANNEL")) ? this.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("CHANNEL")).value : this.options[0]?.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("CHANNEL")) ? this.options[0]?.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("CHANNEL")).value : null;
  }
  
  getUser(key) {
    return this.options.find(x => x.name === key && x.type === Constants.CommandOptionType("USER")) ? this.options.find(x => x.name === key && x.type === Constants.CommandOptionType("USER")).value : this.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("USER")) ? this.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("USER")).value : this.options[0]?.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("USER")) ? this.options[0]?.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("USER")).value : null;
  }
  
  getMentionable(key) {
    return this.options.find(x => x.name === key && x.type === Constants.CommandOptionType("MENTIONABLE")) ? this.options.find(x => x.name === key && x.type === Constants.CommandOptionType("MENTIONABLE")).value : this.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("MENTIONABLE")) ? this.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("MENTIONABLE")).value : this.options[0]?.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("MENTIONABLE")) ? this.options[0]?.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("MENTIONABLE")).value : null;
  }
  
  getRole(key) {
    return this.options.find(x => x.name === key && x.type === Constants.CommandOptionType("ROLE")) ? this.options.find(x => x.name === key && x.type === Constants.CommandOptionType("ROLE")).value : this.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("ROLE")) ? this.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("ROLE")).value : this.options[0]?.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("ROLE")) ? this.options[0]?.options[0]?.options.find(x => x.name === key && x.type === Constants.CommandOptionType("ROLE")).value : null;
  }
}

module.exports = ChatInputInteraction
