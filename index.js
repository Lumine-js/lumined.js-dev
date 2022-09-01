//Client
const Client = require("./src/client/Client.js")

//Structure Constructor
const Embed = require('./src/structure/Embed.js')
const ActionRow = require('./src/structure/ActionRow.js')
const Button = require('./src/structure/Button.js')
const Command = require('./src/structure/Command.js')
const TextInput = require('./src/structure/TextInput.js')
const SelectMenu = require('./src/structure/SelectMenu.js')
const Modal = require('./src/structure/Modal.js')

//Util
const Constants = require('./src/util/constants.js')
const Collection = require('./src/util/Collection.js')

module.exports = {
  Client: Client,
  Collection: Collection,
  Resolver: {
    CommandOptionType: Constants.CommandOptionType,
    CommandPermissionType: Constants.CommandPermissionType,
    CommandType: Constants.CommandType,
    ButtonStyle: Constants.ButtonStyle,
    TextInputStyle: Constants.TextInputStyle,
    ResolveColor: Constants.ResolveColor,
    ActivityType: Constants.ActivityType
  },
  Embed: Embed,
  ActionRow: ActionRow,
  Command: Command,
  Button: Button,
  SelectMenu: SelectMenu,
  TextInput: TextInput,
  Modal: Modal
}
