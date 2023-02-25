# LumineDiscord.js
Lumine.js (Discord) To Interact With the Discord API 

**Note : This module is a development stage module. If there is a problem we are not responsible**

## How To Login?

• Method 1

```js
const { Client } = require('lumined.js')
const client = new Client({
   intents:1,
   token:"YOUR BOT TOKEN",
   activities: [{name: "Buble Chalenge", type: "playing"}],
   status: "idle"
})

client.login()
```

• Method 2 

```js
const { Client } = require('lumined.js')
const client = new Client({
   intents:1,
   activities: [{name: "Buble Chalenge", type: "playing"}],
   status: "idle"
})

client.login("YOUR BOT TOKEN")
```

## Other Documentation

### Event

#### Interaction

##### All

```js
client.on("interactionCreate", (interaction) => {
  //whatever you write
})
```

##### Chat Input Interaction

```js
client.on("ChatInputInteraction", (interaction) => {
  //whatever you write
})
```

### Guild

#### How get guild

You can get information about the guild in 2 ways

1. Storage client
```js
<Client>.guilds.cache.get("guildid")
```

2. Client request to api
```js 
<Client>.getGuild("guildid")
```

### Button

Make button? Try it

```js
//Put in above of your code, and make sure it's only called once
const { Button } = require("lumined.js")

//Let's make it
const btn = new Button()
.setLabel("Button Label")
.setCustomId("Button ID") //Make sure fill this part if your button style isn't "LINK"
.setURL("url") //Make sure fill this part if your button style is "LINK"
.setStyle("Button Style") //You can input number of style or just write name of style button