const { TextInputStyle } = require("./../util/Constants.js")
class TextInput {
  constructor(data) {
    this.type = 4
    this.label = data?.label || null
    this.placeholder = data?.placeholder || null
    this.custom_id = data?.custom_id || null
    this.value = data?.value || null
    this.style = data?.style || null
    this.max_length = data?.max_length || null
    this.min_length = data?.min_length || null
    this.required = data?.required || false
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
      if (placeholder.length > 100) {
        throw new Error("Parameter placeholder Can't Be More Than 100 Letters")
        return this
      }
      this.placeholder = placeholder
      return this
    } catch (err) {
      throw new Error(err)
      return this
    }
  }

  setLabel(label) {
    try {
      if (!label) {
        throw new Error("Parameter Label Must Fill!")
        return this
      }
      if (!typeof label === "string") {
        throw new Error("Parameter label Must Be A String")
        return this
      }
      if (label.length === 0) {
        throw new Error("Parameter label Cannot Be Empty")
        return this
      }
      if (label.length > 45) {
        throw new Error("Parameter label Can't Be More Than 45 Letters")
        return this
      }
      this.label = label
      return this
    } catch (err) {
      throw new Error(err)
      return this
    }
  }

  setValue(value) {
    try {
      if (!value) {
        throw new Error("Parameter value Must Fill!")
        return this
      }
      if (!typeof value === "string") {
        throw new Error("Parameter value Must Be A String")
        return this
      }
      if (value.length === 0) {
        throw new Error("Parameter value Cannot Be Empty")
        return this
      }
      if (value.length > 4000) {
        throw new Error("Parameter value Can't Be More Than 4000 Letters")
        return this
      }
      this.value = value
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

  setMinLength(value) {
    if (!value) {
      throw new Error("Parameter value Must Fill!")
      return this
    }
    if (!typeof value === "number") {
      throw new Error("Parameter value Must Be A Number")
      return this
    }
    this.min_length = value
  }
  setMaxLength(value) {
    if (!value) {
      throw new Error("Parameter value Must Fill!")
      return this
    }
    if (!typeof value === "number") {
      throw new Error("Parameter value Must Be A Number")
      return this
    }
    this.max_length = value
  }

  setStyle(style) {
    try {
      if (!style) {
        throw new Error("Parameter style Must Fill!")
        return this
      }
      if (typeof style === "number") {
        if ((style > 2) && (style < 1)) {
          throw new Error("Parameter style (With Number) Only From Numbers 1 - 2")
          return this
        }
        this.style = style
        return this
      } else if (typeof style === "string") {
        if (style.length === 0) {
          throw new Error("Parameter style Cannot Be Empty")
        }
        if (!TextInputStyle(style)) {
          throw new Error("Parameter style (With String) Invalid, Read Documentation Or Just Use Text Input Style")
          return this
        }
        this.style = TextInputStyle(style)
        return this
      }
    } catch (err) {
      throw new Error(err)
      return this
    }
  }

  setRequired(required) {
    try {
      if (!required || (!typeof required === "boolean")) {
        this.required = false
        return this
      }
      this.required = required
    } catch (err) {
      throw new Error(err)
      return this
    }
  }
}

module.exports = TextInput