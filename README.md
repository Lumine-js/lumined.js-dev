# LumineDiscord.js
Lumine.js (Discord) Custom Eris Library (For Aeryuma Project Usage)

## How To Login?

• Method 1

```js
const { Client } = require('lumine.js')
const client = new Client({
   intents:[],
   token:"YOUR BOT TOKEN"
})

client.login()
```

• Method 2 

```js
const { Client } = require('lumine.js')
const client = new Client({
   intents:[]
})

client.login("YOUR BOT TOKEN")
```
