"use strict";  

class ActionRow {
  constructor(data) {
    this.type = 1
    this.components = data.components ? data.components : null
  }

  addComponent(obj) {
    if (this.components === null) this.components = []
    if (!obj) {
      throw new Error('Obj Cannot Empty')
      return this
    }
    if (!typeof obj === "object") {
      throw new Error("Obj Must Be A Object From Component Builder")
      return this
    }
    this.components.push(obj)
  }

  addComponents(naray) {
    if (this.components === null) this.components = []
    if (!typeof naray === "array") {
      throw new Error('Naray Must Be Array')
      return this
    }
    naray.map((yanto, yanti) => {
      if (!yanto) {
        throw new Error(`[Component ${yanti}] ` + 'Obj Cannot Empty')
        return this
      }
      if (!typeof yanto === "object") {
        throw new Error(`[Component ${yanti}] ` + "Obj Must Be A Object From Component Builder")
        return this
      }
      this.components.push(yanto)
    })
    return this
  }
}

module.exports = {
  ActionRow: ActionRow
}
