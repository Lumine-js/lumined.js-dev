const Guild = require("./../structure/Guild.js")

class CacheManager extends Map {
  set(key, value) {
    super.set(key, new Guild(value))
  }
}

class GuildManager {
  constructor(iterable = []) {
    this.cache = new CacheManager()
    iterable.map(x => this.cache.set(x.id, new Guild(x)))
  }
}

module.exports = GuildManager