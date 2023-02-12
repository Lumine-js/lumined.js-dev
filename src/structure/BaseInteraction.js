class BaseInteraction {
  constructor(options = {}) {
    this.token = null
    this?.rawdata = null
  }
  
  isCommand() {
    if(this?.rawdata?.type === 2) return true
  }
  
  isChatInputCommand() {
    if(this?.rawdata?.type === 2) {
      if(this?.rawdata?.data?.type === 1) return true
    }
    return false
  }
  
  isUserCommand() {
    if (this?.rawdata?.type === 2) {
      if (this?.rawdata?.data?.type === 2) return true
    }
    return false
  }
  
  isMessageCommand() {
    if(this?.rawdata?.type === 2) {
      if(this?.rawdata?.data?.type === 3) return true
    }
    return false
  }
  
  isButton() {
    if (this?.rawdata?.type === 3) {
      if(this?.rawdata?.data?.type === 2) return true
    }
    return false
  }
  
  isSelectMenu() {
    if (this?.rawdata?.type === 3) {
      if (this?.rawdata?.data?.type === 3) return true
    }
    return false
  }
}

module.exports = BaseInteraction
