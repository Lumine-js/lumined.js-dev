import luminedjs from "./index.js";

import Client from "./src/client/Client.js";

//Structure Constructor
import { Embed } from './src/structure/Embed.js'; 
import { ActionRow } from './src/structure/ActionRow.js';
import { Button } from './src/structure/Button.js';
import { TextInput } from './src/structure/TextInput.js';
import { SelectMenu } from './src/structure/SelectMenu.js';
import { Modal } from './src/structure/Modal.js';

//Util
const Constants = require('./src/util/Constants.js')
const Collection = require('./src/util/Collection.js')


const Resolver = {
  CommandOptionType: Constants.CommandOptionType,
  CommandPermissionType: Constants.CommandPermissionType,
  CommandType: Constants.CommandType,
  ButtonStyle: Constants.ButtonStyle,
  TextInputStyle: Constants.TextInputStyle,
  ResolveColor: Constants.ResolveColor,
  ActivityType: Constants.ActivityType
}

export const {
  Client,
  Collection,
  Resolver
} = luminedjs
