const Discord = require("discord.js");

class RegisterCommand {

	static getName(){
		return "register";
	}

	static execute(bot, message, args){
		if(global.configManager.isRegistered(message.author.id)){
			message.channel.send(global.configManager.getTranslation(message.author.id,"ALREADY_REGISTERED"));
		}
		else{
			global.configManager.registerUser(message.author.id);
			message.channel.send(global.configManager.getTranslation(message.author.id,"REGISTERED"));
		}
	}
}

module.exports = RegisterCommand;