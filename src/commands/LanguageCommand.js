const Discord = require("discord.js");

class LanguageCommand {

	static getName(){
		return "setlang";
	}

	static execute(bot, message, args){
		if(!global.configManager.isRegistered(message.author.id)) return message.channel.send(global.configManager.getTranslation("365211824661987333","NOT_REGISTERED"));
		if(args == "fr" || args == "en"){
			global.configManager.setLanguage(message.author.id, args[0]);
			global.configManager.writeData();
			message.channel.send(global.configManager.getTranslation(message.author.id, "SET_LANGUAGE", [args[0]]));
		} else {
			message.channel.send("Usage : $setlang <en|fr>");
		}
	}
}

module.exports = LanguageCommand;