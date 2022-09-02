const { ResolveColor } = require("./../util/constants.js")

class Embed {
  constructor(raw) {
    this.title = raw?.title || null
    this.description = raw?.description || null
    this.url = raw?.url || null
    this.fields = raw?.fields || []
    this.author = raw?.author || null
    this.footer = raw?.footer || null
    this.image = raw?.image || null
    this.color = raw?.color || ResolveColor("Random")
  }

  addField(name, value, inline) {
    try {
      if (!name) {
        console.log("(Builder Alert) Parameter name Must Fill!")
        return this
      }
      if (!typeof name === "string") {
        console.log("(Builder Alert) Parameter name Must Be A String")
        return this
      }
      if (name.length === 0) {
        console.log("(Builder Alert) Parameter name Cannot Be Empty")
        return this
      }
      if (!value) {
        console.log("(Builder Alert) Parameter value Must Fill!")
        return this
      }
      if (!typeof value === "string") {
        console.log("(Builder Alert) Parameter value Must Be A String")
        return this
      }
      if (value.length === 0) {
        console.log("(Builder Alert) Parameter value Cannot Be Empty")
        return this
      }
      if (!inline || (!typeof inline === "boolean")) {
        inline = false
      }

      if (!Array.isArray(this.fields)) this.fields = []
      this.fields.push({ name: name, value: value, inline: inline })
      return this
    } catch(err) {
      console.log("(Builder Error) " + err)
      return this
    }
  }

  addFields(fields) {
    try {
      if (!Array.isArray(fields)) {
        console.log("(Builder Alert) Fields Must be array")
        return this
      }
      if (fields.length === 0) {
        console.log("(Builder Alert) Fields Cannot Be Empty")
        return this
      }

      fields.map((neh, num) => {
        if (!neh?.name) {
          console.log(`(Builder Alert) Parameter name Must Fill! [Field ${num}]`)
          return this
        }
        if (!typeof neh?.name === "string") {
          console.log(`(Builder Alert) Parameter name Must Be A String [Field ${num}]`)
          return this
        }
        if (neh?.name.length === 0) {
          console.log(`(Builder Alert) Parameter name Cannot Be Empty [Field ${num}]`)
          return this
        }
        if (!neh?.value) {
          console.log(`(Builder Alert) Parameter value Must Fill! [Field ${num}]`)
          return this
        }
        if (!typeof neh?.value === "string") {
          console.log(`(Builder Alert) Parameter value Must Be A String [Field ${num}]`)
          return this
        }
        if (neh?.value.length === 0) {
          console.log(`(Builder Alert) Parameter value Cannot Be Empty [Field ${num}]`)
          return this
        }

        if (!neh?.inline || (!typeof neh?.inline === "boolean")) {
          inline = false
        }

        if (!Array.isArray(this.fields)) this.fields = []
        this?.fields.push({ title: neh?.name, value: neh?.value, inline: neh?.inline })
      })
      return this
    } catch(err) {
      console.log("(Builder Error) " + err)
      return this
    }
  }

  setColor(color) {
    try {
      if ((typeof color === "string")) {
        this.color = ResolveColor(color)
        return this
      } else if ((typeof color === "integer")) {
        this.color = color
        return this
      } else if ((typeof color === "array")) {
        this.color = [color[0], color[1], color[2]]
        return this
      }
    } catch(err) {
      console.log("(Builder Error) " + err)
      return this
    }
  }

  setImage(image) {
    try {
      if (typeof image === "string") {
        this.image = {url: image}
        return this
      } else {
        if (!image?.url) {
          console.log("(Builder Alert) Parameter image.url Must Fill!")
          return this
        }
        if (!typeof image?.url === "string") {
          console.log("(Builder Alert) Parameter image.url Must Be A String")
          return this
        }
        if (image?.url.length === 0) {
          console.log("(Builder Alert) Parameter image.url Cannot Be Empty")
          return this
        }
        if ((!image.url?.startsWith("http")) || (!image.url?.startsWith("https"))) {
          console.log("(Builder Alert) Parameter image.url Must Be Using URL\n\nLike \"https://google.com/image.jpg\"")
          return this
        }
        this.image = { url: image.url }
        return this

      }
    } catch(err) {
      console.log("(Builder Error) " + err)
      return this
    }
  }

  setThumbnail(image) {
    try {
      if (!image?.url) {
        console.log("(Builder Alert) Parameter image.url Must Fill!")
        return this
      }
      if (!typeof image?.url === "string") {
        console.log("(Builder Alert) Parameter image.url Must Be A String")
        return this
      }
      if (image?.url.length === 0) {
        console.log("(Builder Alert) Parameter image.url Cannot Be Empty")
        return this
      }
      if ((!image.url?.startsWith("http")) || (!image.url?.startsWith("https"))) {
        console.log("(Builder Alert) Parameter image.url Must Be Using URL\n\nLike \"https://google.com/image.jpg\"")
        return this
      }
      this.thumbnail = { url: image.url }
      return this
    } catch(err) {
      console.log("(Builder Error) " + err)
      return this
    }
  }

  setDescription(description) {
    try {
      if (!description) {
        console.log("(Builder Alert) Parameter description Must Fill!")
        return this
      }
      if (!typeof description === "string") {
        console.log("(Builder Alert) Parameter description Must Be A String")
        return this
      }
      if (description.length === 0) {
        console.log("(Builder Alert) Parameter description Cannot Be Empty")
        return this
      }
      this.description = description
      return this
    } catch(err) {
      console.log("(Builder Error) " + err)
      return this
    }
  }

  setTitle(title) {
    try {
      if (!title) {
        console.log("(Builder Alert) Parameter title Must Fill!")
        return this
      }
      if (!typeof title === "string") {
        console.log("(Builder Alert) Parameter title Must Be A String")
        return this
      }
      if (title.length === 0) {
        console.log("(Builder Alert) Parameter title Cannot Be Empty")
        return this
      }
      this.title = title
      return this
    } catch(err) {
      console.log("(Builder Error) " + err)
      return this
    }
  }

  setAuthor(name, iconURL, url) {
    try {
      if ((!name?.name) && (!name?.iconURL) && (!name?.url)) {
        if (!name) {
          console.log("(Builder Alert) Parameter name Must Fill!")
          return this
        }
        if (!typeof name === "string") {
          console.log("(Builder Alert) Parameter name Must Be A String")
          return this
        }
        if (name.length === 0) {
          console.log("(Builder Alert) Parameter name Cannot Be Empty")
          return this
        }
        if (!iconURL) {
          iconURL = null
        }
        if (!typeof iconURL === "null") {
          if (!typeof iconURL === "string") {
            console.log("(Builder Alert) Parameter iconURL Must Be A String")
            return this
          }
          if (iconURL.length === 0) {
            console.log("(Builder Alert) Parameter iconURL Cannot Be Empty")
            return this
          }
        }


        if (!url) {
          url = null
        }
        if (!typeof url === "null") {
          if (!typeof url === "string") {
            console.log("(Builder Alert) Parameter url Must Be A String")
            return this
          }
          if (url.length === 0) {
            console.log("(Builder Alert) Parameter url Cannot Be Empty")
            return this
          }
        }
        this.author = { name: name, iconURL: iconURL, url: url }
        return this
      } else {
        if (!name?.name) {
          console.log("(Builder Alert) Parameter name Must Fill!")
          return this
        }
        if (!typeof name?.name === "string") {
          console.log("(Builder Alert) Parameter name Must Be A String")
          return this
        }
        if (name?.name.length === 0) {
          console.log("(Builder Alert) Parameter name Cannot Be Empty")
          return this
        }
        if (!name?.iconURL) {
          name.iconURL = null
        }
        if (!typeof name?.iconURL === "null") {
          if ((!typeof name?.iconURL === "string")) {
            console.log("(Builder Alert) Parameter iconURL Must Be A String")
            return this
          }
          if (name?.iconURL.length === 0) {
            console.log("(Builder Alert) Parameter iconURL Cannot Be Empty")
            return this
          }
        }
        if (!name?.url) {
          name.url = null
        }
        if (!typeof name?.iconURL === "null") {
          if ((!typeof name?.url === "string")) {
            console.log("(Builder Alert) Parameter url Must Be A String")
            return this
          }
          if (name?.url.length === 0) {
            console.log("(Builder Alert) Parameter url Cannot Be Empty")
            return this
          }
        }
        this.author = { name: name.name, iconURL: name.iconURL, url: name.url }
        return this
      }
    } catch(err) {
      console.log("(Builder Error) " + err)
      return this
    }
  }

  setFooter(text, iconURL) {
    try {
      if ((!text?.text) && (!text?.iconURL)) {
        if (!text) {
          console.log("(Builder Alert) Parameter text Must Fill!")
          return this
        }
        if (!typeof text === "string") {
          console.log("(Builder Alert) Parameter text Must Be A String")
          return this
        }
        if (text.length === 0) {
          console.log("(Builder Alert) Parameter text Cannot Be Empty")
          return this
        }
        if (!iconURL) {
          iconURL = null
        }
        if (!typeof iconURL === "null") {
          if ((!typeof iconURL === "string")) {
            console.log("(Builder Alert) Parameter iconURL Must Be A String")
            return this
          }
          if (iconURL.length === 0) {
            console.log("(Builder Alert) Parameter iconURL Cannot Be Empty")
            return this
          }
        }
        this.footer = { text: text, iconURL: iconURL }
        return this
      } else {
        if (!text?.text) {
          console.log("(Builder Alert) Parameter text Must Fill!")
          return this
        }
        if (!typeof text?.text === "string") {
          console.log("(Builder Alert) Parameter text Must Be A String")
          return this
        }
        if (text?.text.length === 0) {
          console.log("(Builder Alert) Parameter text Cannot Be Empty")
          return this
        }
        if (!text?.iconURL) {
          text.iconURL = null
        }
        if (!typeof text?.iconURL === "null") {
          if ((!typeof text?.iconURL === "string")) {
            console.log("(Builder Alert) Parameter iconURL Must Be A String")
            return this
          }
          if (text?.iconURL.length === 0) {
            console.log("(Builder Alert) Parameter iconURL Cannot Be Empty")
            return this
          }
        }
        this.footer = { text: text.text, iconURL: text.iconURL }
        return this
      }
    } catch(err) {
      console.log("(Builder Error) " + err)
      return this
    }
  }

  setURL(url) {
    try {
      if (!url) {
        console.log("(Builder Alert) Parameter url Must Fill!")
        return this
      }
      if (!typeof url === "string") {
        console.log("(Builder Alert) Parameter url Must Be A String")
        return this
      }
      if (url.length === 0) {
        console.log("(Builder Alert) Parameter url Cannot Be Empty")
        return this
      }
      this.url = url
      return this
    } catch(err) {
      console.log("(Builder Error) " + err)
      return this
    }
  }

  setTimestamp(date) {
    try {
      if (!date) {
        this.date = new Date()
        return this
      }
      if (!typeof date === "date") {
        console.log("(Builder Alert) Parameter date Must Be A Date")
        return this
      }
      this.date = date
      return this
    } catch(err) {
      console.log("(Builder Error) " + err)
      return this
    }
  }
}

module.exports = {
  Embed: Embed
}
