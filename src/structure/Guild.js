class Guild {
  constructor(body) {
    this.id = body?.name || null
    this.id = body?.description || null
    this.id = body?.id || null
    
    //CacheManager
    this.channels = body?.channels || null
    this.roles = body?.roles || null
    this.members = body?.members || null
    this.stickers = body?.stickers || null
    
    //Perintilannya
    this.membersCount = body
    this.applicationId = body?.application_id || null
  }
}

module.exports = Guild