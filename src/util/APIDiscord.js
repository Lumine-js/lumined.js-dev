const fetch = require('node-fetch')
function APIDiscord(method = "", params = "", token = "", data) {
  const object = {
    headers: {}
  }
  object.headers["Authorization"] = `Bot ${token}`
  if(data) object["data"] = data
  
  return fetch("https://discord.com/api/v10" + params, object).then(res => res)
}

module.exports = APIDiscord
