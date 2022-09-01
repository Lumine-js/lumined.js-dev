const { CommandOptionType } = require("./../util/constants.js")

class Command {
  constructor(data) {
    this.name = data?.name || null
    this.description = data?.description || null
    this.options = data?.options || [];
    this.type = data?.type || 1
  }

  setName(name) {
    try {
      if (!name) {
        console.log("(Clorynin Alert) Parameter name Must Fill!")
        return this
      }
      if (!typeof name === "string") {
        console.log("(Clorynin Alert) Parameter name Must Be A String")
        return this
      }
      if (name.length === 0) {
        console.log("(Clorynin Alert) Parameter name Cannot Be Empty")
        return this
      }
      this.name = name
      return this
    } catch (err) {
      console.log("(Clorynin Error) " + err)
      return this
    }
  }

  setDescription(description) {
    try {
      if (!description) {
        console.log("(Clorynin Alert) Parameter name Must Fill!")
        return this
      }
      if (!typeof description === "string") {
        console.log("(Clorynin Alert) Parameter name Must Be A String")
        return this
      }
      if (description.length === 0) {
        console.log("(Clorynin Alert) Parameter name Cannot Be Empty")
        return this
      }
      this.description = description
      return this
    } catch (err) {
      console.log("(Clorynin Error) " + err)
      return this
    }
  }

  setType(type) {
    try {
      if (typeof type === "number") {
        if ((type > 3) && (type < 1)) {
          console.log('Type Command Isn\'t Valid (Support 1 - 3)')
          return this
        }
        this.type = type
      }
      if (typeof type === "string") {
        if (!CommandType(type)) {
          console.log("Not Valid")
          return this
        }
        this.type = CommandType(type)
      }
    } catch (err) {
      console.log("(Clorynin Error) " + err)
      return this
    }
  }

  addOption(name, description, type, required, autocomplete) {
    try {
      if (!name) {
        console.log("(Clorynin Alert) Parameter name Must Fill!")
        return this
      }
      if (!typeof name === "string") {
        console.log("(Clorynin Alert) Parameter name Must Be A String")
        return this
      }
      if (name.length === 0) {
        console.log("(Clorynin Alert) Parameter name Cannot Be Empty")
        return this
      }
      if (!description) {
        console.log("(Clorynin Alert) Parameter description Must Fill!")
        return this
      }
      if (!typeof description === "string") {
        console.log("(Clorynin Alert) Parameter description Must Be A String")
        return this
      }
      if (description.length === 0) {
        console.log("(Clorynin Alert) Parameter description Cannot Be Empty")
        return this
      }

      if (!required || (!typeof required === "boolean")) {
        required = false
      }

      if (!type) {
        console.log("(Clorynin Alert) Parameter type Must Fill!")
        return this
      }
      if (typeof type === "number") {
        if ((type > 11) && (type < 1)) {
          console.log("(Clorynin Alert) Parameter type (With Number) Only From Numbers 1 - 11")
          return this
        }
        type = type
        return this
      } else if (typeof type === "string") {
        if (type.length === 0) {
          console.log("(Clorynin Alert) Parameter type Cannot Be Empty")
        }
        if (!CommandOptionType(type)) {
          console.log("(Clorynin Alert) Parameter type (With String) Invalid, Read Documentation Or Just Use Number Type")
          return this
        }
        type = CommandOptionType(type)
        return this
      }

      if (((!autocomplete) || (!typeof autocomplete === "boolean")) && (!type === 3 || 4 || 10)) {
        autocomplete = false
      }

      if (!Array.isArray(this.options)) this.options = []
      this.options.push({ name: name, description: description, type: type, required: required })
      return this
    } catch (err) {
      console.log("(Clorynin Error) " + err)
      return this
    }
  }

  addOptions(options) {
    try {
      if (!Array.isArray(options)) {
        console.log("(Clorynin Alert) Options Must be array")
        return this
      }
      if (options.length === 0) {
        console.log("(Clorynin Alert) Options Cannot Be Empty")
        return this
      }
      options.map((neh, num) => {
        if (!neh?.name) {
          console.log(`(Clorynin Alert) Parameter name Must Fill! [Option ${num}]`)
          return this
        }
        if (!typeof neh?.name === "string") {
          console.log(`(Clorynin Alert) Parameter name Must Be A String [Option ${num}]`)
          return this
        }
        if (!neh?.name.length === 0) {
          console.log(`(Clorynin Alert) Parameter name Cannot Be Empty [Option ${num}]`)
          return this
        }
        if (!neh?.description) {
          console.log(`(Clorynin Alert) Parameter description Must Fill! [Option ${num}]`)
          return this
        }
        if (!typeof neh?.description === "string") {
          console.log(`(Clorynin Alert) Parameter description Must Be A String [Option ${num}]`)
          return this
        }
        if (neh?.description.length === 0) {
          console.log(`(Clorynin Alert) Parameter description Cannot Be Empty [Option ${num}]`)
          return this
        }

        if (!neh?.required || (!typeof neh?.required === "boolean")) {
          neh.required = false
        }

        if (!neh?.type) {
          console.log(`(Clorynin Alert) Parameter type Must Fill! [Option ${num}]`)
          return this
        }
        if (typeof neh?.type === "number") {
          if ((neh?.type > 11) && (neh?.type < 1)) {
            console.log(`(Clorynin Alert) Parameter type (With Number) Only From Numbers 1 - 11 [Option ${num}]`)
            return this
          }
          if(neh.type === 3 || 4 || 10) {
            if(!neh?.autocomplete) {
              neh.autocomplete = false
            } else if(!typeof neh?.autocomplete === "boolean") {
              neh.autocomplete = false
            }
          }
        } else if (typeof neh?.type === "string") {
          if (neh?.type.length === 0) {
            console.log(`(Clorynin Alert) Parameter type Cannot Be Empty [Option ${num}]`)
            return this
          }
          if (!CommandOptionType(neh?.type)) {
            console.log(`(Clorynin Alert) Parameter type (With String) Invalid, Read Documentation Or Just Use Number Type [Option ${num}]`)
            return this
          }
          neh.type = CommandOptionType(neh.type)
          if(neh.type === 3 || 4 || 10) {
            if(!neh?.autocomplete) {
              neh.autocomplete = false
            } else if(!typeof neh?.autocomplete === "boolean") {
              neh.autocomplete = false
            }
          }
        }
        this.options.push({ title: neh?.name, description: neh?.description, type : neh?.type, required: neh?.required, autocomplete: neh?.autocomplete})
      })
      return this
    } catch (err) {
      console.log("(Clorynin Error) " + err)
      return this
    }
  }

  addSubcommand(name, description) {
    try {
      if (!name) {
        console.log("(Clorynin Alert) Parameter name Must Fill!")
        return this
      }
      if (!typeof name === "string") {
        console.log("(Clorynin Alert) Parameter name Must Be A String")
        return this
      }
      if (name.length === 0) {
        console.log("(Clorynin Alert) Parameter name Cannot Be Empty")
        return this
      }
      if (!description) {
        console.log("(Clorynin Alert) Parameter description Must Fill!")
        return this
      }
      if (!typeof description === "string") {
        console.log("(Clorynin Alert) Parameter description Must Be A String")
        return this
      }
      if (description.length === 0) {
        console.log("(Clorynin Alert) Parameter description Cannot Be Empty")
        return this
      }

      this.options.push({ name: name, description: description, type: CommandOptionType("SUB_COMMAND") })
      return this
    } catch (err) {
      console.log("(Clorynin Error) " + err)
      return this
    }
  }

  addSubcommandGroup(name, description, options) {
    try {
      if (!name) {
        console.log("(Clorynin Alert) Parameter name Must Fill!")
        return this
      }
      if (!typeof name === "string") {
        console.log("(Clorynin Alert) Parameter name Must Be A String")
        return this
      }
      if (name.length === 0) {
        console.log("(Clorynin Alert) Parameter name Cannot Be Empty")
        return this
      }
      if (!description) {
        console.log("(Clorynin Alert) Parameter description Must Fill!")
        return this
      }
      if (!typeof description === "string") {
        console.log("(Clorynin Alert) Parameter description Must Be A String")
        return this
      }
      if (description.length === 0) {
        console.log("(Clorynin Alert) Parameter description Cannot Be Empty")
        return this
      }

      if (Array.isArray(options)) {
        options = options.map((na, nu) => {
          return {
            name: na?.name || null,
            description: na?.description || null,
            type: na?.type || null,
            required: na?.required || false,
            autocomplete: na?.autocomplete || false,
            min_value: na?.min_value || null,
            max_value: na?.max_value || null
          }
        })
      }
      this.options.push({ name: name, description: description, type: CommandOptionType("SUB_COMMAND_GROUP"), options: options })
      return this
    } catch (err) {
      console.log("(Clorynin Error) " + err)
      return this
    }
  }

  addStringOption(name, description, required, autocomplete) {
    try {
      if (!required || (!typeof required === "boolean")) {
        required = false
      }
      if (!autocomplete || (!typeof autocomplete === "boolean")) {
        autocomplete = false
      }
      if (!name) {
        console.log("(Clorynin Alert) Parameter name Must Fill!")
        return this
      }
      if (!typeof name === "string") {
        console.log("(Clorynin Alert) Parameter name Must Be A String")
        return this
      }
      if (name.length === 0) {
        console.log("(Clorynin Alert) Parameter name Cannot Be Empty")
        return this
      }
      if (!description) {
        console.log("(Clorynin Alert) Parameter description Must Fill!")
        return this
      }
      if (!typeof description === "string") {
        console.log("(Clorynin Alert) Parameter description Must Be A String")
        return this
      }
      if (description.length === 0) {
        console.log("(Clorynin Alert) Parameter description Cannot Be Empty")
        return this
      }

      this.options.push({ name: name, description: description, type: CommandOptionType("STRING"), autocomplete: autocomplete, required: required })
      return this
    } catch (err) {
      console.log("(Clorynin Error) " + err)
      return this
    }
  }

  addIntegerOption(name, description, required, autocomplete, min_value, max_value) {
    try {
      if (!required || (!typeof required === "boolean")) {
        required = false
      }
      if (!autocomplete || (!typeof autocomplete === "boolean")) {
        autocomplete = false
      }
      if (!name) {
        console.log("(Clorynin Alert) Parameter name Must Fill!")
        return this
      }
      if (!typeof name === "string") {
        console.log("(Clorynin Alert) Parameter name Must Be A String")
        return this
      }
      if (name.length === 0) {
        console.log("(Clorynin Alert) Parameter name Cannot Be Empty")
        return this
      }
      if (!description) {
        console.log("(Clorynin Alert) Parameter description Must Fill!")
        return this
      }
      if (!typeof description === "string") {
        console.log("(Clorynin Alert) Parameter description Must Be A String")
        return this
      }
      if (description.length === 0) {
        console.log("(Clorynin Alert) Parameter description Cannot Be Empty")
        return this
      }
      var angka = { name: name, description: description, type: CommandOptionType("INTEGER"), autocomplete: autocomplete, required: required }

      if (min_value && (typeof min_value === "integer")) {
        angka["min_value"] = min_value
      }

      if (max_value && (typeof max_value === "integer")) {
        angka["max_value"] = max_value
      }

      this.options.push(angka)
      return this
    } catch (err) {
      console.log("(Clorynin Error) " + err)
      return this
    }
  }

  addIntegerOption(name, description, required, autocomplete, min_value, max_value) {
    try {
      if (!required || (!typeof required === "boolean")) {
        required = false
      }
      if (!autocomplete || (!typeof autocomplete === "boolean")) {
        autocomplete = false
      }
      if (!name) {
        console.log("(Clorynin Alert) Parameter name Must Fill!")
        return this
      }
      if (!typeof name === "string") {
        console.log("(Clorynin Alert) Parameter name Must Be A String")
        return this
      }
      if (name.length === 0) {
        console.log("(Clorynin Alert) Parameter name Cannot Be Empty")
        return this
      }
      if (!description) {
        console.log("(Clorynin Alert) Parameter description Must Fill!")
        return this
      }
      if (!typeof description === "string") {
        console.log("(Clorynin Alert) Parameter description Must Be A String")
        return this
      }
      if (description.length === 0) {
        console.log("(Clorynin Alert) Parameter description Cannot Be Empty")
        return this
      }
      var angka = { name: name, description: description, type: CommandOptionType("NUMBER"), autocomplete: autocomplete, required: required }

      if (min_value && (typeof min_value === "number")) {
        angka["min_value"] = min_value
      }

      if (max_value && (typeof max_value === "number")) {
        angka["max_value"] = max_value
      }

      this.options.push(angka)
      return this
    } catch (err) {
      console.log("(Clorynin Error) " + err)
      return this
    }
  }

  addBooleanOption(name, description, required) {
    try {
      if (!required || (!typeof required === "boolean")) {
        required = false
      }
      if (!name) {
        console.log("(Clorynin Alert) Parameter name Must Fill!")
        return this
      }
      if (!typeof name === "string") {
        console.log("(Clorynin Alert) Parameter name Must Be A String")
        return this
      }
      if (name.length === 0) {
        console.log("(Clorynin Alert) Parameter name Cannot Be Empty")
        return this
      }
      if (!description) {
        console.log("(Clorynin Alert) Parameter description Must Fill!")
        return this
      }
      if (!typeof description === "string") {
        console.log("(Clorynin Alert) Parameter description Must Be A String")
        return this
      }
      if (description.length === 0) {
        console.log("(Clorynin Alert) Parameter description Cannot Be Empty")
        return this
      }
      this.options.push({ name: name, description: description, type: CommandOptionType("BOOLEAN"), required: required })
      return this
    } catch (err) {
      console.log("(Clorynin Error) " + err)
      return this
    }
  }

  addUserOption(name, description, required) {
    try {
      if (!required || (!typeof required === "boolean")) {
        required = false
      }
      if (!name) {
        console.log("(Clorynin Alert) Parameter name Must Fill!")
        return this
      }
      if (!typeof name === "string") {
        console.log("(Clorynin Alert) Parameter name Must Be A String")
        return this
      }
      if (name.length === 0) {
        console.log("(Clorynin Alert) Parameter name Cannot Be Empty")
        return this
      }
      if (!description) {
        console.log("(Clorynin Alert) Parameter description Must Fill!")
        return this
      }
      if (!typeof description === "string") {
        console.log("(Clorynin Alert) Parameter description Must Be A String")
        return this
      }
      if (description.length === 0) {
        console.log("(Clorynin Alert) Parameter description Cannot Be Empty")
        return this
      }
      this.options.push({ name: name, description: description, type: CommandOptionType("USER"), required: required })
      return this
    } catch (err) {
      console.log("(Clorynin Error) " + err)
      return this
    }
  }

  addChannelOption(name, description, required) {
    try {
      if (!required || (!typeof required === "boolean")) {
        required = false
      }
      if (!name) {
        console.log("(Clorynin Alert) Parameter name Must Fill!")
        return this
      }
      if (!typeof name === "string") {
        console.log("(Clorynin Alert) Parameter name Must Be A String")
        return this
      }
      if (name.length === 0) {
        console.log("(Clorynin Alert) Parameter name Cannot Be Empty")
        return this
      }
      if (!description) {
        console.log("(Clorynin Alert) Parameter description Must Fill!")
        return this
      }
      if (!typeof description === "string") {
        console.log("(Clorynin Alert) Parameter description Must Be A String")
        return this
      }
      if (description.length === 0) {
        console.log("(Clorynin Alert) Parameter description Cannot Be Empty")
        return this
      }
      this.options.push({ name: name, description: description, type: CommandOptionType("CHANNEL"), required: required })
      return this
    } catch (err) {
      console.log("(Clorynin Error) " + err)
      return this
    }
  }

  addRoleOption(name, description, required) {
    try {
      if (!required || (!typeof required === "boolean")) {
        required = false
      }
      if (!name) {
        console.log("(Clorynin Alert) Parameter name Must Fill!")
        return this
      }
      if (!typeof name === "string") {
        console.log("(Clorynin Alert) Parameter name Must Be A String")
        return this
      }
      if (name.length === 0) {
        console.log("(Clorynin Alert) Parameter name Cannot Be Empty")
        return this
      }
      if (!description) {
        console.log("(Clorynin Alert) Parameter description Must Fill!")
        return this
      }
      if (!typeof description === "string") {
        console.log("(Clorynin Alert) Parameter description Must Be A String")
        return this
      }
      if (description.length === 0) {
        console.log("(Clorynin Alert) Parameter description Cannot Be Empty")
        return this
      }
      this.options.push({ name: name, description: description, type: CommandOptionType("ROLE"), required: required })
      return this
    } catch (err) {
      console.log("(Clorynin Error) " + err)
      return this
    }
  }

  addMentionOption(name, description, required) {
    try {
      if (!required || (!typeof required === "boolean")) {
        required = false
      }
      if (!name) {
        console.log("(Clorynin Alert) Parameter name Must Fill!")
        return this
      }
      if (!typeof name === "string") {
        console.log("(Clorynin Alert) Parameter name Must Be A String")
        return this
      }
      if (name.length === 0) {
        console.log("(Clorynin Alert) Parameter name Cannot Be Empty")
        return this
      }
      if (!description) {
        console.log("(Clorynin Alert) Parameter description Must Fill!")
        return this
      }
      if (!typeof description === "string") {
        console.log("(Clorynin Alert) Parameter description Must Be A String")
        return this
      }
      if (description.length === 0) {
        console.log("(Clorynin Alert) Parameter description Cannot Be Empty")
        return this
      }
      this.options.push({ name: name, description: description, type: CommandOptionType("MENTIONABLE"), required: required })
      return this
    } catch (err) {
      console.log("(Clorynin Error) " + err)
      return this
    }
  }

  addNumberOption(name, description, required, autocomplete, min_value, max_value) {
    try {
      if (!required || (!typeof required === "boolean")) {
        required = false
      }
      if (!autocomplete || (!typeof autocomplete === "boolean")) {
        autocomplete = false
      }
      if (!name) {
        console.log("(Clorynin Alert) Parameter name Must Fill!")
        return this
      }
      if (!typeof name === "string") {
        console.log("(Clorynin Alert) Parameter name Must Be A String")
        return this
      }
      if (name.length === 0) {
        console.log("(Clorynin Alert) Parameter name Cannot Be Empty")
        return this
      }
      if (!description) {
        console.log("(Clorynin Alert) Parameter description Must Fill!")
        return this
      }
      if (!typeof description === "string") {
        console.log("(Clorynin Alert) Parameter description Must Be A String")
        return this
      }
      if (description.length === 0) {
        console.log("(Clorynin Alert) Parameter description Cannot Be Empty")
        return this
      }
      var angka = { name: name, description: description, type: CommandOptionType("INTEGER"), autocomplete: autocomplete, required: required }

      if (min_value && (typeof min_value === "number")) {
        angka["min_value"] = min_value
      }

      if (max_value && (typeof max_value === "number")) {
        angka["max_value"] = max_value
      }
      this.options.push(angka)
      return this
    } catch (err) {
      console.log("(Clorynin Error) " + err)
      return this
    }
  }

  addAttachmentOption(name, description, required) {
    try {
      if (!required || (!typeof required === "boolean")) {
        required = false
      }
      if (!name) {
        console.log("(Clorynin Alert) Parameter name Must Fill!")
        return this
      }
      if (!typeof name === "string") {
        console.log("(Clorynin Alert) Parameter name Must Be A String")
        return this
      }
      if (name.length === 0) {
        console.log("(Clorynin Alert) Parameter name Cannot Be Empty")
        return this
      }
      if (!description) {
        console.log("(Clorynin Alert) Parameter description Must Fill!")
        return this
      }
      if (!typeof description === "string") {
        console.log("(Clorynin Alert) Parameter description Must Be A String")
        return this
      }
      if (description.length === 0) {
        console.log("(Clorynin Alert) Parameter description Cannot Be Empty")
        return this
      }
      this.options.push({ name: name, description: description, type: CommandOptionType("ATTACHMENT"), required: required })
      return this
    } catch (err) {
      console.log("(Clorynin Error) " + err)
      return this
    }
  }
}

module.exports = {
  Command: Command
}
