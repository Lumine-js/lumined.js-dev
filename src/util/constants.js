module.exports.Status = {
  Playing:0,
  Streaming:1,
  Listening:2,
  Watching:3,
  Custom:4,
  Competing:5
}

module.exports.OptionType = {
  SUB_COMMAND:1,
  SUB_COMMAND_GROUP:2,
  STRING:3,
  INTEGER:4,
  BOOLEAN:5,
  USER:6,
  CHANNEL:7,
  ROLE:8,
  MENTIONABLE:9,
  NUMBER:10,
  ATTACHMENT: 11
}

module.exports.ENDPOINTS = {
  RESPOND_INTERACTION: (interaction_id, interaction_token) => `/interactions/${interaction_id}/${interaction_token}/callback`,
  EDIT_INTERACTION: (application_id, interaction_token) => `/webhooks/${application_id}/${interaction_token}/messages/@original`,
  FOLLOWUP_INTERACTION: (application_id, interaction_token) => `/webhooks/${application_id}/${interaction_token}`
}

module.exports.CommandOptionType = (args) => {
  if (!args) return;
  if (!typeof args === "string") {
    return console.log("(Clorynin Module Eror) args Must Be A String")
  }
  args = args.toUpperCase()
  if (args === "SUB_COMMAND") {
    return 1
  }
  if (args === "SUB_COMMAND_GROUP") {
    return 2
  }
  if (args === "STRING") {
    return 3
  }
  if (args === "INTEGER") {
    return 4
  }
  if (args === "BOOLEAN") {
    return 5
  }
  if (args === "USER") {
    return 6
  }
  if (args === "CHANNEL") {
    return 7
  }
  if (args === "ROLE") {
    return 8
  }
  if (args === "MENTIONABLE") {
    return 9
  }
  if (args === "NUMBER") {
    return 10
  }
  if (args === "ATTACHMENT") {
    return 11
  }
}

module.exports.CommandType = (args) => {
  if (!args) return;
  if (!typeof args === "string") {
    return console.log("(Clorynin Module Eror) args Must Be A String")
  }
  args = args.toUpperCase()
  if (args === "CHAT_INPUT") {
    return 1
  }
  if (args === "USER") {
    return 2
  }
  if (args === "MESSAGE") {
    return 3
  }
}

module.exports.CommandPermissionType = (args) => {
  if (!args) return;
  if (!typeof args === "string") {
    return console.log("(Clorynin Module Eror) args Must Be A String")
  }
  args = args.toUpperCase()
  if (args === "ROLE") {
    return 1
  }
  if (args === "USER") {
    return 2
  }
}

module.exports.CommandType = (args) => {
  if (!args) return;
  if (!typeof args === "string") {
    return console.log("(Clorynin Module Eror) args Must Be A String")
  }
  args = args.toUpperCase()
  if (args === "CHAT_INPUT") {
    return 1
  }
  if (args === "USER") {
    return 2
  }
  if (args === "MESSAGE") {
    return 3
  }
}

//Style
module.exports.ButtonStyle = (args) => {
  if(!args) return;
  if(!typeof args === "string") {
    return console.log("(Clorynin Module Eror) args Must Be A String")
  }
  args = args.toUpperCase()
  if (args === "PRIMARY") {
    return 1
  }
  if (args === "SECONDARY") {
    return 2
  }
  if (args === "SUCCESS") {
    return 3
  }
  if (args === "DANGER") {
    return 4
  }
  if (args === "LINK") {
    return 5
  }
}

module.exports.TextInputStyle = (args) => {
  if (!args) return;
  if (!typeof args === "string") {
    return console.log("(Clorynin Module Eror) args Must Be A String")
  }
  if(!typeof args === "string") {
    return console.log("(Clorynin Module Eror) args Must Be A String")
  }
  args = args.toUpperCase()
  if (args === "SHORT") {
    return 1
  }
  if (args === "PARAGRAPH") {
    return 2
  }
}

module.exports.ResolveColor = (args) => {
  if(!args) return;
  if ((!typeof args === "string")) console.log("Color Must Be A String")
  if (args.startsWith("#")) {
    var bbggrr = args.substr(4, 2) + args.substr(2, 2) + args.substr(0, 2);
    return parseInt(bbggrr, 16);
  }
  args = args.toLowerCase()
  if (!args.startsWith('#')) {
    args = args.toLowerCase()
    if (args === "green") {
      return 3066993
    }
    if (args === "blue") {
      return 3447003
    }
    if (args === "purple") {
      return 10181046
    }
    if (args === "orange") {
      return 15105570
    }
    if (args === "red") {
      return 15158332
    }
    if (args === "yellow") {
      return 16776960
    }
    if (args === "random") {
      var datawarna = [3066993, 10181046, 3447003, 15105570, 15158332, 16776960]
      return datawarna[Math.floor(Math.random() * datawarna.length)];
    }
  }
}
