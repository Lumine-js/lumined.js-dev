module.exports.CommandOptionType = (args) => {
  if (!args) return;
  if (!typeof args === "string") {
    return console.log("(Clorynin Module Eror) args Must Be A String")
  }
  args = args.toUpperCase()
  switch (args) {
    case "SUB_COMMAND":
      return 1
      break;
    case "SUB_COMMAND_GROUP":
      return 2
      break;
    case "STRING":
      return 3
      break;
    case "INTEGER":
      return 4
      break;
    case "BOOLEAN":
      return 5
      break;
    case "USER":
      return 6
      break;
    case "CHANNEL":
      return 7
      break;
    case "ROLE":
      return 8
      break;
    case "MENTIONABLE":
      return 9
      break;
    case "NUMBER":
      return 10
      break;
    case "ATTACHMENT":
      return 11
      break;
  }
}

module.exports.CommandType = (args) => {
  if (!args) return;
  if (!typeof args === "string") {
    return console.log("(Clorynin Module Eror) args Must Be A String")
  }
  args = args.toUpperCase()
  switch (args) {
    case "CHAT_INPUT":
      return 1
      break;
    case "USER":
      return 2
      break;
    case "MESSAGE":
      return 3
      break;
  }
}

module.exports.CommandPermissionType = (args) => {
  if (!args) return;
  if (!typeof args === "string") {
    return console.log("(Clorynin Module Eror) args Must Be A String")
  }
  args = args.toUpperCase()
  switch (args) {
    case "ROLE":
      return 1
      break;
    case "USER":
      return 2
      break;
  }
}

module.exports.CommandType = (args) => {
  if (!args) return;
  if (!typeof args === "string") {
    return console.log("(Clorynin Module Eror) args Must Be A String")
  }
  args = args.toUpperCase()
  switch (args) {
    case "CHAT_INPUT":
      return 1
      break;
    case "USER":
      return 2
      break;
    case "MESSAGE":
      return 3
      break;
  }
}

//Style
module.exports.ButtonStyle = (args) => {
  if (!args) return;
  if (!typeof args === "string") {
    return console.log("(Clorynin Module Eror) args Must Be A String")
  }
  args = args.toUpperCase()
  switch (args) {
    case "PRIMARY":
      return 1
      break;
    case "SECONDARY":
      return 2
      break;
    case "SUCCESS":
      return 3
      break;
    case "DANGER":
      return 4
      break;
    case "LINK":
      return 5
      break;
  }
}

module.exports.TextInputStyle = (args) => {
  if (!args) return;
  if (!typeof args === "string") {
    return console.log("(Clorynin Module Eror) args Must Be A String")
  }
  if (!typeof args === "string") {
    return console.log("(Clorynin Module Eror) args Must Be A String")
  }
  args = args.toUpperCase()
  switch (args) {
    case "SHORT":
      return 1
      break;
    case "PARAGRAPH":
      return 2
      break;
  }
}


module.exports.ResolveColor = (args) => {
  if (!args) return;
  if ((!typeof args === "string")) console.log("Color Must Be A String")
  if (args.startsWith("#")) {
    var bbggrr = args.substr(4, 2) + args.substr(2, 2) + args.substr(0, 2);
    return parseInt(bbggrr, 16);
  }
  args = args.toLowerCase()
  if (!args.startsWith('#')) {
    args = args.toLowerCase()
    switch (args) {
      case "green":
        return 3066993
        break;
      case "blue":
        return 3447003
        break;
      case "purple":
        return 10181046
        break;
      case "orange":
        return 15105570
        break;
      case "red":
        return 15158332
        break;
      case "yellow":
        return 16776960
        break;
      case "random":
        var datawarna = [3066993, 10181046, 3447003, 15105570, 15158332, 16776960]
        return datawarna[Math.floor(Math.random() * datawarna.length)];
        break;
    }

  }
}

module.exports.ActivityType = (type) => {
  type = type.toLowerCase()
  switch (type) {
    case "playing":
      return 0
      break;
    case "streaming":
      return 1
      break;
    case "listening":
      return 2
      break;
    case "watching":
      return 3
      break;
    case "custom":
      return 4
      break;
    case "competing":
      return 5
      break;
  }
}

module.exports.ENDPOINTS = {
  RESPOND_INTERACTION: (interaction_id, interaction_token) => `/interactions/${interaction_id}/${interaction_token}/callback`,
  EDIT_INTERACTION: (application_id, interaction_token) => `/webhooks/${application_id}/${interaction_token}/messages/@original`,
  FOLLOWUP_INTERACTION: (application_id, interaction_token) => `/webhooks/${application_id}/${interaction_token}`,
  GLOBAL_COMMANDS: (application_id) => `/applications/${application_id}/commands`,
  GUILD_COMMANDS: (application_id, guild_id) => `/applications/${application_id}/guilds/${guild_id}/commands`,
  USER: (user_id) => `/users/${user_id}`,
  CHANNEL: (channel_id) => `/channels/${channel_id}`
}
