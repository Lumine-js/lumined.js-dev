const { ButtonStyle } = require("./../util/constants.js")

class Button {
  constructor(data) {
    this.type = 2
    this.style = data?.style || null
    this.label = data?.label || null
    this.custom_id = data?.custom_id || null
    this.url = data?.url || null
    this.disabled = data?.disabled || false
  }

  setLabel(label) {
    try {
      if (!label) {
        console.log("(Clorynin Alert) Parameter Label Must Fill!")
        return this
      }
      if (!typeof label === "string") {
        console.log("(Clorynin Alert) Parameter label Must Be A String")
        return this
      }
      if (label.length === 0) {
        console.log("(Clorynin Alert) Parameter label Cannot Be Empty")
        return this
      }
      if (label.length > 80) {
        console.log("(Clorynin Alert) Parameter label Can't Be More Than 80 Letters")
        return this
      }
      this.label = label
      return this
    } catch (err) {
      console.log("(Clorynin Error) " + err)
      return this
    }
  }

  setCustomId(id) {
    try {
      if((!this.style > 4) || ((this.url?.length > 0) && (typeof this.url === "string"))) {
        console.log("(Clorynin Autoskip) Your Button Style Is Link Button / Have Custom Url")
        return this
      }
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

  setEmoji(emojiobject) {
    try {
      if (!emojiobject) {
        console.log("(Clorynin Alert) Parameter emojiobject Must Fill!")
        return this
      }
      if(!typeof emojiid === "object") {
        console.log("(Clorynin Alert) Parameter emojiobject Must Be A Object")
        return this
      }
      
      this.emoji = emojiobject
      return this
    } catch (err) {
      console.log("(Clorynin Error) " + err)
      return this
    }
  }

  setStyle(style) {
    try {
      if(typeof this.url === "string") {
        if(ButtonStyle(style) < 5) {
          console.log("(Clorynin Alert) Your Button Have Custom URL")
          return this
        }
      } else if(typeof this.custom_id === "string") {
        if(ButtonStyle(style) === 5) {
          console.log("(Clorynin Alert) Your Button Have ID!")
          return this
        }
      }
      if (!style) {
        console.log("(Clorynin Alert) Parameter style Must Fill!")
        return this
      }
      if (typeof style === "number") {
        if ((style > 5) && (style < 1)) {
          console.log("(Clorynin Alert) Parameter style (With Number) Only From Numbers 1 - 5")
          return this
        }
        this.style = style
        return this
      } else if (typeof style === "string") {
        if (style.length === 0) {
          console.log("(Clorynin Alert) Parameter style Cannot Be Empty")
        }
        if (!ButtonStyle(style)) {
          console.log("(Clorynin Alert) Parameter style (With String) Invalid, Read Documentation Or Just Use Number Style")
          return this
        }
        this.style = ButtonStyle(style)
        return this
      }
    } catch (err) {
      console.log("(Clorynin Error) " + err)
      return this
    }
  }

  setUrl(url) {
    try {
      if((!this.style === 5) || ((this.custom_id?.length > 0) && (typeof this.custom_id === "string"))) {
        console.log("(Clorynin Autoskip) Your Button Style Is Not A Link / Have ID")
        return this
      }
      if (!url) {
        console.log("(Clorynin Alert) Parameter url Must Fill!")
        return this
      }
      if (!typeof url === "string") {
        console.log("(Clorynin Alert) Parameter url Must Be A String")
        return this
      }
      if (url.length === 0) {
        console.log("(Clorynin Alert) Parameter url Cannot Be Empty")
        return this
      }

      this.url = url
      return this
    } catch (err) {
      console.log("(Clorynin Error) " + err)
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
      console.log("(Clorynin Error) " + err)
      return this
    }
  }

}

module.exports = {
  Button: Button
}
