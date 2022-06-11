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
  FOLLOWUP_INTERACTION: (application_id, interaction_token) => `/webhooks/${application_id}/${interaction_token}`,
  GLOBAL_COMMANDS: (application_id) => `/applications/${application_id}/commands`,
  GUILD_COMMANDS: (application_id, guild_id) => `/applications/${application_id}/guilds/${guild_id}/commands`
}
