# LumineDiscord.js
Lumine.js (Discord) To Interact With the Discord API 

## How To Login?

• Method 1

```js
const { Client } = require('lumine.js')
const client = new Client({
   intents:1,
   token:"YOUR BOT TOKEN"
})

client.login()
```

• Method 2 

```js
const { Client } = require('lumine.js')
const client = new Client({
   intents:1
})

client.login("YOUR BOT TOKEN")
```
