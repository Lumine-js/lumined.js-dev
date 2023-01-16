module.exports.CommandOptionType = (arg) => {
  const values = {
    SUB_COMMAND: 1,
    SUB_COMMAND_GROUP: 2,
    STRING: 3,
    INTEGER: 4,
    BOOLEAN: 5,
    USER: 6,
    CHANNEL: 7,
    ROLE: 8,
    MENTIONABLE: 9,
    NUMBER: 10,
    ATTACHMENT: 11
  }

  arg = arg.toUpperCase()
  const value = values[arg]
  const string = Object.keys(values).find(key => values[key] === arg)

  if (value) {
    return value
  } else if (string) {
    return string
  } else {
    return null
  }
}

module.exports.CommandType = (arg) => {
  const values = {
    CHAT_INPUT: 1,
    USER: 2,
    MESSAGE: 3
  }

  arg = arg.toUpperCase()
  const value = values[arg]
  const string = Object.keys(values).find(key => values[key] === arg)

  if (value) {
    return value
  } else if (string) {
    return string
  } else {
    return null
  }
}

module.exports.ButtonStyle = (arg) => {
  const values = {
    PRIMARY: 1,
    SECONDARY: 2,
    SUCCESS: 3,
    DANGER: 4,
    LINK: 5
  }

  arg = arg.toUpperCase()
  const value = values[arg]
  const string = Object.keys(values).find(key => values[key] === arg)

  if (value) {
    return value
  } else if (string) {
    return string
  } else {
    return null
  }
}

module.exports.CommandPermissionType = (arg) => {
  const values = {
    ROLE: 1,
    USER: 2
  }

  arg = arg.toUpperCase()
  const value = values[arg]
  const string = Object.keys(values).find(key => values[key] === arg)

  if (value) {
    return value
  } else if (string) {
    return string
  } else {
    return null
  }
}

module.exports.CommandPermissionType = (arg) => {
  const values = {
    SHORT: 1,
    PARAGRAPH: 2
  }

  arg = arg.toUpperCase()
  const value = values[arg]
  const string = Object.keys(values).find(key => values[key] === arg)

  if (value) {
    return value
  } else if (string) {
    return string
  } else {
    return null
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
  const values = {
    PLAYING: 0,
    STREAMING: 1,
    LISTENING: 2,
    WATCHING: 3,
    CUSTOM: 4,
    COMPETING: 5
  }

  arg = arg.toUpperCase()
  const value = values[arg]
  const string = Object.keys(values).find(key => values[key] === arg)

  if (value) {
    return value
  } else if (string) {
    return string
  } else {
    return null
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
