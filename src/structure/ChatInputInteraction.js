//========== STRUCTURE DATA
const BaseInteraction = require("./BaseInteraction.js")
const Constants = require("./../util/constants.js")

//========== CLASS
class ChatInputInteraction extends BaseInteraction {
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

  async reply(msgdata) {
    await this.client.requestAPI("POST", Constants.ENDPOINTS.RESPOND_INTERACTION(this.id, this.token), {
      type: 4,
      data: msgdata
    })
  }

  async deferReply() {
    await this.client.requestAPI("POST", Constants.ENDPOINTS.RESPOND_INTERACTION(this.id, this.token), {
      type: 5
    })
  }

  async followUp(msgdata) {
    await this.client.requestAPI("POST", Constants.ENDPOINTS.FOLLOWUP_INTERACTION(this.applicationId, this.token), msgdata)
  }

  async editReply(msgdata) {
    await this.client.requestAPI("PATCH", Constants.ENDPOINTS.EDIT_INTERACTION(this.applicationId, this.token), msgdata)
  }

  async showModal(modaldata) {
    await this.client.requestAPI("POST", Constants.ENDPOINTS.RESPOND_INTERACTION(this.id, this.token), {
      type: 9,
      data: modaldata
    })
  }

  getSubcommandGroup(key, required = false) {
    try {
      return this?.options?.find(x => x?.type === Constants.CommandOptionType("SUB_COMMAND_GROUP"))?.name
    } catch {
      return null
    }
  }

  getSubcommand() {
    try {
      return this?.options?.find(x => x?.type === Constants.CommandOptionType("SUB_COMMAND"))?.name
    } catch {
      try {
        return this?.options[0]?.options?.find(x => x?.type === Constants.CommandOptionType("SUB_COMMAND"))?.name
      } catch {
        return null
      }
    }
  }

  getString(key, required = false) {
    try {
      return this?.options?.find(x => (x?.name === key && x?.type === Constants.CommandOptionType("STRING")))?.value
    } catch {
      try {
        return this?.options[0]?.options?.find(x => (x?.name === key && x?.type === Constants.CommandOptionType("STRING")))?.value
      } catch {
        try {
          return this?.options[0]?.options[0]?.options?.find(x => (x?.name === key && x?.type === Constants.CommandOptionType("STRING")))?.value
        } catch {
          return null
        }
      }
    }
  }

  getNumber(key, required = false) {
    try {
      return this?.options?.find(x => (x?.name === key && x?.type === Constants.CommandOptionType("NUMBER")))?.value
    } catch {
      try {
        return this?.options[0]?.options?.find(x => (x?.name === key && x?.type === Constants.CommandOptionType("NUMBER")))?.value
      } catch {
        try {
          return this?.options[0]?.options[0]?.options?.find(x => (x?.name === key && x?.type === Constants.CommandOptionType("NUMBER")))?.value
        } catch {
          return null
        }
      }
    }
  }

  getBoolean(key, required = false) {
    try {
      return this?.options?.find(x => (x?.name === key && x?.type === Constants.CommandOptionType("BOOLEAN")))?.value
    } catch {
      try {
        return this?.options[0]?.options?.find(x => (x?.name === key && x?.type === Constants.CommandOptionType("BOOLEAN")))?.value
      } catch {
        try {
          return this?.options[0]?.options[0]?.options?.find(x => (x?.name === key && x?.type === Constants.CommandOptionType("BOOLEAN")))?.value
        } catch {
          return null
        }
      }
    }
  }

  getInteger(key, required = false) {
    try {
      return this?.options?.find(x => (x?.name === key && x?.type === Constants.CommandOptionType("INTEGER")))?.value
    } catch {
      try {
        return this?.options[0]?.options?.find(x => (x?.name === key && x?.type === Constants.CommandOptionType("INTEGER")))?.value
      } catch {
        try {
          return this?.options[0]?.options[0]?.options?.find(x => (x?.name === key && x?.type === Constants.CommandOptionType("INTEGER")))?.value
        } catch {
          return null
        }
      }
    }
  }

  getAttachment(key, required = false) {
    try {
      return this?.options?.find(x => (x?.name === key && x?.type === Constants.CommandOptionType("ATTACH")))?.value
    } catch {
      try {
        return this?.options[0]?.options?.find(x => (x?.name === key && x?.type === Constants.CommandOptionType("ATTACH")))?.value
      } catch {
        try {
          return this?.options[0]?.options[0]?.options?.find(x => (x?.name === key && x?.type === Constants.CommandOptionType("ATTACH")))?.value
        } catch {
          return null
        }
      }
    }
  }

  getChannel(key, required = false) {
    try {
      return this?.options?.find(x => (x?.name === key && x?.type === Constants.CommandOptionType("CHANNEL")))?.value
    } catch {
      try {
        return this?.options[0]?.options?.find(x => (x?.name === key && x?.type === Constants.CommandOptionType("CHANNEL")))?.value
      } catch {
        try {
          return this?.options[0]?.options[0]?.options?.find(x => (x?.name === key && x?.type === Constants.CommandOptionType("CHANNEL")))?.value
        } catch {
          return null
        }
      }
    }
  }

  getUser(key, required = false) {
    try {
      return this?.options?.find(x => (x?.name === key && x?.type === Constants.CommandOptionType("USER")))?.value
    } catch {
      try {
        return this?.options[0]?.options?.find(x => (x?.name === key && x?.type === Constants.CommandOptionType("USER")))?.value
      } catch {
        try {
          return this?.options[0]?.options[0]?.options?.find(x => (x?.name === key && x?.type === Constants.CommandOptionType("USER")))?.value
        } catch {
          return null
        }
      }
    }
  }

  getMentionable(key, required = false) {
    try {
      return this?.options?.find(x => (x?.name === key && x?.type === Constants.CommandOptionType("MENTIONABLE")))?.value
    } catch {
      try {
        return this?.options[0]?.options?.find(x => (x?.name === key && x?.type === Constants.CommandOptionType("MENTIONABLE")))?.value
      } catch {
        try {
          return this?.options[0]?.options[0]?.options?.find(x => (x?.name === key && x?.type === Constants.CommandOptionType("MENTIONABLE")))?.value
        } catch {
          return null
        }
      }
    }
  }

  getRole(key, required = false) {
    try {
      return this?.options?.find(x => (x?.name === key && x?.type === Constants.CommandOptionType("ROLE")))?.value
    } catch {
      try {
        return this?.options[0]?.options?.find(x => (x?.name === key && x?.type === Constants.CommandOptionType("ROLE")))?.value
      } catch {
        try {
          return this?.options[0]?.options[0]?.options?.find(x => (x?.name === key && x?.type === Constants.CommandOptionType("ROLE")))?.value
        } catch {
          return null
        }
      }
    }
  }
}

module.exports = ChatInputInteraction
