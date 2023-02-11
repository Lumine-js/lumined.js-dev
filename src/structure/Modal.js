"use strict";  

class Modal {
  constructor(data) {
    this.title = data.title ? data.title : null
    this.custom_id = data.custom_id ? data.custom_id : null
    this.components = data.components ? data.components : null
  }
  
  setTitle(title) {
    try {
      if (!title) {
        throw new Error("Parameter title Must Fill!")
        return this
      }
      if (!typeof title === "string") {
        throw new Error("Parameter title Must Be A String")
        return this
      }
      if (title.length === 0) {
        throw new Error("Parameter title Cannot Be Empty")
        return this
      }
      this.title = title
      return this
    } catch (err) {
      throw new Error(err)
      return this
    }
  }
  setCustomId(id) {
    try {
      if (!id) {
        throw new Error("Parameter id Must Fill!")
        return this
      }
      if (!typeof id === "string") {
        throw new Error("Parameter id Must Be A String")
        return this
      }
      if (id.length === 0) {
        throw new Error("Parameter id Cannot Be Empty")
        return this
      }
      if (id.length > 100) {
        throw new Error("Parameter id Can't Be More Than 100 Letters")
        return this
      }
      this.custom_id = id
      return this
    } catch (err) {
      throw new Error(err)
      return this
    }
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
  Modal: Modal
}
