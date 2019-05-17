const Discord = require("discord.js");

class GiveCommand {

	static getName(){
		return "give";
	}

	static async execute(bot, message, args){
		if(!global.configManager.isRegistered(message.author.id)) return message.channel.send(configManager.getTranslation(message.author.id,"NOT_REGISTERED"));
		if(!args) return message.channel.send(configManager.getTranslation(message.author.id,"USAGE", ["$give <userid> <ressource> <amount>"]))
		let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]) || message.guild.members.find("name", args[0]));
		let type = args[1];
		let amount = args[2];
		if(type !== "wheat" && type !== "ble" && type !== "blé" && type !== "barley" && type !== "orge" && type !== "potatoe" && type !== "patate") { type = false; } else { type = global.configManager.stringToRessource(type); }
		if(!user || !global.configManager.isRegistered(user.id)) return message.channel.send(configManager.getTranslation(message.author.id,"USER_NOT_FOUND"));
		if(user.id == message.author.id) return message.channel.send(global.configManager.getTranslation(message.author.id,"SELF_TRADE"));
		if(!type) return message.channel.send(global.configManager.getTranslation(message.author.id,"RESSOURCE_NOT_FOUND"));
		if(!amount) return message.channel.send(global.configManager.getTranslation(message.author.id,"SPECIFY_AMOUNT"));
		if(!global.shopManager.hasRessource(message.author.id, amount, type)) return message.channel.send(global.configManager.getTranslation(message.author.id,"ENOUGHT_RESSOURCE"));

		let confirm = new Discord.RichEmbed()
		.setTitle(global.configManager.getTranslation(message.author.id,"EMBED_TITLE_TRADE_CONFIRM"))
		.setDescription(global.configManager.getTranslation(message.author.id,"TRADE_CONFIRM", [type, amount, user.user.username]));
		let msg = await message.channel.send(confirm);
		msg.react("✅").then(() => msg.react("❌"));
		let filter = (reaction, user) => { return ['✅', '❌'].includes(reaction.emoji.name) && user.id == message.author.id; }
		let collector = msg.createReactionCollector(filter, { time: 1000000000 });
		collector.on('collect', function(reaction, collector) {
			switch(reaction.emoji.name){
				case "✅":
				global.shopManager.processTrade(message.author.id, user.id, amount, type);
				let success = new Discord.RichEmbed()
				.setTitle(global.configManager.getTranslation(message.author.id,"EMBED_TITLE_TRADE_CONFIRM"))
				.setDescription(global.configManager.getTranslation(message.author.id,"TRADE_SUCCESS"));
				collector.stop();
				return msg.edit(success);
				break;
				case "❌":
				let decline = new Discord.RichEmbed()
				.setTitle(global.configManager.getTranslation(message.author.id,"EMBED_TITLE_TRADE_CONFIRM"))
				.setDescription(global.configManager.getTranslation(message.author.id,"TRADE_CANCELLED"));
				collector.stop();
				return msg.edit(decline);
				break;
			}
		});
		collector.on('end', collected => {
			return;
		});
	}
}

module.exports = GiveCommand;