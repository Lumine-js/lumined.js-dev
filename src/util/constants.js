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
  RESPOND_INTERACTION: (interaction_id, interaction_token) => `/interactions/${interaction_id}/${interaction_token}/callback`
}
