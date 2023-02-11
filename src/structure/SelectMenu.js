class SelectMenu {
  constructor(data) {
    this.type = 3
    this.placeholder = data?.placeholder || null
    this.min_values = data?.min_values || null
    this.max_values = data?.max_values || null
    this.options = data?.options || []
    this.disabled = data?.disabled || null
  }

  setPlaceholder(placeholder) {
    try {
      if (!placeholder) {
        throw new Error("Parameter Label Must Fill!")
        return this
      }
      if (!typeof placeholder === "string") {
        throw new Error("Parameter label Must Be A String")
        return this
      }
      if (placeholder.length === 0) {
        throw new Error("Parameter label Cannot Be Empty")
        return this
      }
      if (placeholder.length > 150) {
        throw new Error("Parameter label Can't Be More Than 150 Letters")
        return this
      }
      this.placeholder = placeholder
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

  setMinValues(value) {
    if (!value) {
      throw new Error("Parameter value Must Fill!")
      return this
    }
    if(!typeof value === "number") {
      throw new Error("Parameter value Must Be A Number")
      return this
    }
    this.min_values = value
    return this
  }
  
  setMaxValues(value) {
    if (!value) {
      throw new Error("Parameter value Must Fill!")
      return this
    }
    if(!typeof value === "number") {
      throw new Error("Parameter value Must Be A Number")
      return this
    }
    this.max_values = value
    return this
  }
  
  addOptions(data) {
    if (!data) {
      throw new Error("Parameter data Must Fill!")
      return this
    }
    if (!Array.isArray(data)) {
      throw new Error("Parameter data Must Be A String")
      return this
    }
    if (!data.length === 0) {
      throw new Error("Parameter data Cannot Be Empty")
      return this
    }
    data.map((neh, num) => {
      if (!neh?.label) {
        throw new Error(`Parameter label Must Fill! [Field ${num}]`)
        return this
      }
      if (!typeof neh?.label === "string") {
        throw new Error(`Parameter label Must Be A String [Field ${num}]`)
        return this
      }
      if (neh?.label?.length === 0) {
        throw new Error(`Parameter label Cannot Be Empty [Field ${num}]`)
        return this
      }
      if (!neh?.value) {
        throw new Error(`Parameter value Must Fill! [Field ${num}]`)
        return this
      }
      if (!typeof neh?.value === "string") {
        throw new Error(`Parameter value Must Be A String [Field ${num}]`)
        return this
      }
      if (neh?.value?.length === 0) {
        throw new Error(`Parameter value Cannot Be Empty [Field ${num}]`)
        return this
      }

      if ((!neh?.emoji?.id) || (!neh?.emoji)) {
        neh.emoji = null
      }
      if (!typeof neh?.emoji === "null") {
        if (!typeof neh?.emoji === "string") {
          throw new Error("Parameter iconURL Must Be A String")
          return this
        }
        if (neh?.emoji?.length === 0) {
          throw new Error("Parameter iconURL Cannot Be Empty")
          return this
        }
      }

      if (!neh?.description) {
        neh.description = null
      }
      if (!typeof neh?.description === "null") {
        if ((!typeof neh?.description === "string")) {
          throw new Error("Parameter iconURL Must Be A String")
          return this
        }
        if (neh?.description?.length === 0) {
          throw new Error("Parameter iconURL Cannot Be Empty")
          return this
        }
      }

      if (!neh?.default || (!typeof neh?.default === "boolean")) {
        neh.default = false
      }

      if (!Array.isArray(this.options)) this.options = []
      this.options.push({ label: neh?.label, value: neh?.value, description: neh?.description, emoji: neh?.emoji, default: neh?.default })
    })
    return this
  }
}

module.exports = {
  SelectMenu: SelectMenu
}
