class Base {
  toString() {
    if(this.recache === "user") return `<@${this.id}>`
    if(this.recache === "channel") return `<#${this.id}>`
  }
}

module.exports = Base
