const Base = require("./Base.js")
class UserClient extends Base {
  constructor(options = {}, client) {
    super()
    this.recache = "user"
    this.id = options.user.id
    this.username = options.user.username
    this.discriminator = options.user.discriminator
    this.avatar = options.user.avatar
    this.banner = options.user.banner
    this.bot = options.user.bot
    this.accentColor = options.user.accent_color
    this.recache = "user"
  }
  
  /*displayAvatarURL(options = {}) {
    if(!options?.size) options.size = 256
    if(!options?.static) options.static = true
    return ""
  }
  
  displayBannerURL(options = {}) {
    
  }*/
}

module.exports = UserClient
