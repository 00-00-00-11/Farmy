const Discord = require("discord.js");

class HarvestCommand {

	static getName(){
		return "harvest";
	}

	static execute(bot, message, args){
		if(!global.configManager.isRegistered(message.author.id)) return message.channel.send(global.configManager.getTranslation(message.author.id,"NOT_REGISTERED"));

		if(!global.configManager.isGrowed(message.author.id, 1)) return message.channel.send(global.configManager.getTranslation(message.author.id,"FIELD_NOT_READY", [global.configManager.getGrowTime(message.author.id, 1)]));

		global.configManager.harvest(message.author.id);
		message.channel.send(global.configManager.getTranslation(message.author.id,"RECOLT_FIELD"));
	}
}

module.exports = HarvestCommand;