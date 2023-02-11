"use strict";

const { ButtonStyle } = require("./../util/Constants.js")

class Button {
  constructor(data) {
    this.type = 2
    this.style = data.style ? data.style : null
    this.label = data.label ? data.label : null
    this.custom_id = data.custom_id ? data.custom_id : null
    this.url = data.url ? data.url : null
    this.disabled = data.disabled ? data.disabled : false
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
      if (label.length > 80) {
        throw new Error("Parameter label Can't Be More Than 80 Letters")
        return this
      }
      this.label = label
      return this
    } catch (err) {
      throw new Error(err)
      return this
    }
  }

  setCustomId(id) {
    try {
      if ((!this.style > 4) || ((this.url?.length > 0) && (typeof this.url === "string"))) {
        console.warn("Your Button Style Is Link Button / Have Custom Url")
        return this
      }
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

  setEmoji(emojiobject) {
    try {
      if (!emojiobject) {
        throw new Error("Parameter emojiobject Must Fill!")
        return this
      }
      if (!typeof emojiid === "object") {
        throw new Error("Parameter emojiobject Must Be A Object")
        return this
      }

      this.emoji = emojiobject
      return this
    } catch (err) {
      throw new Error(err)
      return this
    }
  }

  setStyle(style) {
    try {
      if (typeof this.url === "string") {
        if (ButtonStyle(style) < 5) {
          throw new Error("Your Button Have Custom URL")
          return this
        }
      } else if (typeof this.custom_id === "string") {
        if (ButtonStyle(style) === 5) {
          throw new Error("Your Button Have ID!")
          return this
        }
      }
      if (!style) {
        throw new Error("Parameter style Must Fill!")
        return this
      }
      if (typeof style === "number") {
        if ((style > 5) && (style < 1)) {
          throw new Error("Parameter style (With Number) Only From Numbers 1 - 5")
          return this
        }
        this.style = style
        return this
      } else if (typeof style === "string") {
        if (style.length === 0) {
          throw new Error("Parameter style Cannot Be Empty")
        }
        if (!ButtonStyle(style)) {
          throw new Error("Parameter style (With String) Invalid, Read Documentation Or Just Use Number Style")
          return this
        }
        this.style = ButtonStyle(style)
        return this
      }
    } catch (err) {
      throw new Error(err)
      return this
    }
  }

  setUrl(url) {
    try {
      if ((!this.style === 5) || ((this.custom_id?.length > 0) && (typeof this.custom_id === "string"))) {
        console.warn("Your Button Style Is Not A Link / Have ID")
        return this
      }
      if (!url) {
        throw new Error("Parameter url Must Fill!")
        return this
      }
      if (!typeof url === "string") {
        throw new Error("Parameter url Must Be A String")
        return this
      }
      if (url.length === 0) {
        throw new Error("Parameter url Cannot Be Empty")
        return this
      }

      this.url = url
      return this
    } catch (err) {
      throw new Error(err)
      return this
    }
  }

  setDisabled(visible) {
    try {
      if (!visible || (!typeof visible === "boolean")) {
        this.disabled = false
        return this
      }
      this.disabled = visible
    } catch (err) {
      throw new Error(err)
      return this
    }
  }

}

module.exports = {
  Button: Button
}
