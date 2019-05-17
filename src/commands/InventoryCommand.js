const Discord = require("discord.js");

class InventoryCommand {

	static getName(){
		return "inv";
	}

	static execute(bot, message, args){
		let configManager = global.configManager;

		if(!global.configManager.isRegistered(message.author.id)) return message.channel.send(configManager.getTranslation(message.author.id,"NOT_REGISTERED"));

		let data = global.configManager.getUserData(message.author.id);
		let e = new Discord.RichEmbed()
		.setAuthor(configManager.getTranslation(message.author.id,"INVENTORY_TITLE", [message.author.username]), message.author.avatarURL)
		.setColor("GREEN")
		.addField(configManager.getTranslation(message.author.id,"BALANCE"), global.configManager.getBalance(message.author.id))
		.addField(configManager.getTranslation(message.author.id,"WHEAT"), data.wheat)
		.addField(configManager.getTranslation(message.author.id,"BARLEY"), data.barley)
		.addField(configManager.getTranslation(message.author.id,"POTATOE"), data.potatoe);
		message.channel.send(e);
	}
}

module.exports = InventoryCommand;