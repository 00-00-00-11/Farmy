const Discord = require("discord.js");
global.bot = new Discord.Client({ disableEveryone: true });
global.bot.commands = new Discord.Collection();
global.bot.commandsAliases = new Discord.Collection(); // An update ??
const bot = global.bot;
const fs = require("fs");

var ConfigManager = require("./managers/ConfigManager");
global.configManager = new ConfigManager();
var ShopManager = require("./managers/ShopManager");
global.shopManager = new ShopManager();
var HDV = require("./utils/HDV");
global.hdv = new HDV();

bot.login(process.env.TOKEN);

fs.readdir("./src/commands/", (err, files) => {
  if(err) console.log(err);
  let commands = files.filter(f => f.split(".").pop() === "js");
  if(commands.length <= 0) return;
  commands.forEach((f, i) =>{
    let command = require(`./commands/${f}`);
    bot.commands.set(command.getName(), command);
    //bot.commandsAliases.set(command.getAliases(), command);
  });
});

bot.on("ready", async () => {
	console.log("Bot initialized.");
	startUpdateTimers();
});

bot.on("message", async message => {
  let prefix = global.configManager.botPrefix;
  if(!message.content.startsWith(prefix)) return;
  if(global.configManager.isBlocked){
  	if(!global.configManager.config.moderators[message.author.id]){
  		return;
  	}
  }

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let command = bot.commands.get(cmd.slice(prefix.length));
  if(command) command.execute(bot, message, args);
});

function startUpdateTimers() {
	setInterval(function() {
		global.configManager.reduceCountdowns();
	}, 1000);
}
