# LumineDiscord.js
Lumine.js (Discord) To Interact With the Discord API 

Note : This module is a development stage module. If there is a problem we are not responsible

## How To Login?

• Method 1

```js
const { Client } = require('lumine.js')
const client = new Client({
   intents:1,
   token:"YOUR BOT TOKEN",
   activities: [],
   status: "idle"
})

client.login()
```

• Method 2 

```js
const { Client } = require('lumine.js')
const client = new Client({
   intents:1,
   activities: [],
   status: "idle"
})

client.login("YOUR BOT TOKEN")
```
