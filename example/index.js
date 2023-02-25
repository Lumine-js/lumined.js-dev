const { Collection } = require("lumined.js")
var config = {
  command: {
    ChatInput: true,
    Message: false,
    User: false
  }
}

//Express

const express = require("express")
const app = express()

app.get('/', (req, res) => {
  res.sendStatus(200)
})

app.listen(process.env.port)

//Client

const { Client, Embed, ActionRow, Button, Resolver } = require("lumined.js")
const client = new Client({
  token: process.env.dtoken,
  intents: 1,
  activities: [{
    name: 'Lumined.js Testing',
    type: Resolver.ActivityType("PLAYING")
    }],
  status: "idle"
})

var ReadCommand = [];

if (config.command.ChatInput === true) {
  client.ChatInputCommands = new Collection()
  ReadCommand.push('ChatInputCommands')
}
if (config.command.Message === true) {
  client.MessageCommands = new Collection()
  ReadCommand.push('MessageCommands')
}
if (config.command.User === true) {
  client.UserCommands = new Collection()
  ReadCommand.push('UserCommands')
}

ReadCommand.forEach(x => require(__dirname + `/handlers/${x}.js`)(client))

client.on('ready', () => {
  client.updateCommands([{
    name: "eval",
    description: "Doing Experiments // Developer",
    options: [{
      name: "code",
      description: "Execute Code (Javascript)",
      type: Resolver.CommandOptionType("STRING"),
      required: true
    }]
  }], "940979074883518464")
})

client.on("ChatInputInteraction", async (interaction) => {
  let answered = false
  const multiInternal = {
    lang: lang,
    emoji: emoji,
    send: (data, poi = false) => {
      var varena;
      if (!poi) varena = {
        content: null,
        embeds: [],
        components: []
      }
      if (data?.content) varena.content = data.content
      if (data?.components) varena.components = data.components
      if (data?.embeds) varena.embeds = data.embeds
      answered = true
      interaction.editReply(varena)
    },
    edit: (data) => {
      interaction.editReply(data)
    }
  }

  const wait = new Embed()
    .setTitle('Loading')
    .setDescription("Ditunggu sebentar...")
  await interaction.reply({ embeds: [wait] })

  var command = client.ChatInputCommands.get(interaction.name)
  if (command) {
    try {
      if (command.required.developer) {
        if (!interaction.authorId === "552487001824296970") return multiInternal.send({ content: "Hanya bisa digunakan developer saja" })
      }

      setTimeout(function() {
        if (answered === false) {
          var norespond = new Embed()
            .setTitle('Maaf')
            .setDescription("Bot belum merespon apapun...")
          multiInternal.edit({ embeds: [norespond] })
        }
      }, 20000)
      command.run(client, multiInternal, interaction).catch(e => {
        const error = new Embed()
          .setTitle(e.name)
          .setDescription(e.message)
        multiInternal.send({ embeds: [error] })
      })
    } catch (e) {
      const error = new Embed()
        .setTitle(e.name)
        .setDescription(e.message)
      multiInternal.send({ embeds: [error] })
    }
  } else {
    const nocommand = new Embed()
      .setTitle('Perintah tidak tersedia')
      .setDescription('Apakah anda tidak melupakan sesuatu? **•-•**')
      .setColor('RED')
    multiInternal.send({ embeds: [nocommand] })
  }
})

client.login()