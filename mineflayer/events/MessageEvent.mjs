import { Collection } from "discord.js";
import Utils from "../../utils/Utils.mjs";

export default {
  name: "MessageEvent",
  description: "The message event stuff",
  /**
   *
   * @param {String} message
   * @param {import("../Bot.mjs").default} bot
   */
  execute: async function (message, bot) {
    console.log(message.toString());
    if (message.toString().split(" ").includes("Batata"))
      bot.bot.chat("/p join bingoparty");
    if (message.toString().split(" ").includes("Bandora")) bot.bot.chat("/pl");
    if (RegExp(/^From /g).test(message.toString())) {
      let command = message.toString().split(": ")[1]; // !p promo (lets say)
      if(command.toLowerCase().startsWith("boop!")) return bot.bot.chat(`/p invite ${Utils.removeRank(message.toString().split(": ")[0].replace("From ", ""))}`);
      let args = command.split(" "); // Get the arugments of the command
      let commandName = args[1]; // Get the command name
      let commandArgs = args.slice(2); // Get the command arguments
      if (bot.partyCommands.find((value, key) => key.includes(commandName))) {
        let command = bot.partyCommands.find((value, key) =>
          key.includes(commandName)
        );
        let sender = Utils.removeRank(message.toString().split(": ")[0].replace("From ", ""))
        console.log(command.permission)
        if(!command.permission) return command.execute(bot, sender, commandArgs);
        if(command.permission <= bot.utils.getPermissionsByUser({ name: sender })) return command.execute(bot, sender, commandArgs);
        else bot.bot.chat(`/w ${sender} You do not have permission to run this command!`);
      }
    }
  },
};
