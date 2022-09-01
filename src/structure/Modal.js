class Modal {
  constructor(data) {
    this.title = data?.title || null
    this.custom_id = data?.custom_id || null
    this.components = data?.components || null
  }
  
  setTitle(title) {
    try {
      if (!title) {
        console.log("(Clorynin Alert) Parameter title Must Fill!")
        return this
      }
      if (!typeof title === "string") {
        console.log("(Clorynin Alert) Parameter title Must Be A String")
        return this
      }
      if (title.length === 0) {
        console.log("(Clorynin Alert) Parameter title Cannot Be Empty")
        return this
      }
      this.title = title
      return this
    } catch (err) {
      console.log("(Clorynin Error) " + err)
      return this
    }
  }
  setCustomId(id) {
    try {
      if (!id) {
        console.log("(Clorynin Alert) Parameter id Must Fill!")
        return this
      }
      if (!typeof id === "string") {
        console.log("(Clorynin Alert) Parameter id Must Be A String")
        return this
      }
      if (id.length === 0) {
        console.log("(Clorynin Alert) Parameter id Cannot Be Empty")
        return this
      }
      if (id.length > 100) {
        console.log("(Clorynin Alert) Parameter id Can't Be More Than 100 Letters")
        return this
      }
      this.custom_id = id
      return this
    } catch (err) {
      console.log("(Clorynin Error) " + err)
      return this
    }
  }
  
  addComponent(obj) {
    if (this.components === null) this.components = []
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
    if (this.components === null) this.components = []
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
  Modal: Modal
}
