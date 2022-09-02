class ActionRow {
  constructor(data) {
    this.type = 1
    this.components = data?.components || null
  }

  addComponent(obj) {
    if(this.components === null) this.components = []
    if (!obj) {
      console.log('Obj Cannot Empty')
      return this
    }
    if (!typeof obj === "object") {
      console.log("Obj Must Be A Object From Component Builder")
      return this
    }
    this.components.push(obj)
  }

  addComponents(naray) {
    if(this.components === null) this.components = []
    if (!typeof naray === "array") {
      console.log('Naray Must Be Array')
      return this
    }
    naray.map((yanto, yanti) => {
      if (!yanto) {
        console.log(`[Component ${yanti}] ` + 'Obj Cannot Empty')
        return this
      }
      if (!typeof yanto === "object") {
        console.log(`[Component ${yanti}] ` + "Obj Must Be A Object From Component Builder")
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
