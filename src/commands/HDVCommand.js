const Discord = require("discord.js");

class HDVCommand {

	static getName(){
		return "hdv";
	}

	static async execute(bot, message, args){
		if(!global.configManager.isRegistered(message.author.id)) return message.channel.send(configManager.getTranslation(message.author.id,"NOT_REGISTERED"));
      if(!args) return message.channel.send(configManager.getTranslation(message.author.id,"USAGE", ["$hdv <buy|show>"]));

		switch(args[0].toLowerCase()){
			case "show":
			if(!args[1]) return message.channel.send(configManager.getTranslation(message.author.id,"USAGE", ["$hdv show <page>"]));
			let hdv = global.hdv.sortHdv(args[1], message.author.id);
			let page = hdv["page"];
			let e = new Discord.RichEmbed()
			.setTitle("HDV")
			.setColor("GREEN")
			.addField("Page " + hdv["page"], hdv["pageList"])
			.setFooter(`Page ${hdv["page"]}/${hdv["maxPage"]}`);
			let msg = await message.channel.send(e);
			msg.react("◀").then(() => msg.react("▶"));

			// Collector
			let filter = (reaction, user) => { return ['◀', '▶'].includes(reaction.emoji.name) && user.id == message.author.id; }
			let collector = msg.createReactionCollector(filter, { time: 1000000000 });
			collector.on('collect', function(reaction, collector) {
				switch(reaction.emoji.name){
					case "◀":
					page--;
					hdv = global.hdv.sortHdv(page, message.author.id);
					let before = new Discord.RichEmbed()
					.setTitle("HDV")
					.setColor("GREEN")
					.addField("Page " + hdv["page"], hdv["pageList"])
					.setFooter(`Page ${hdv["page"]}/${hdv["maxPage"]}`);
					return msg.edit(before);
					break;
					case "▶":
					page++;
					hdv = global.hdv.sortHdv(page, message.author.id);
					let next = new Discord.RichEmbed()
					.setTitle("HDV")
					.setColor("GREEN")
					.addField("Page " + hdv["page"], hdv["pageList"])
					.setFooter(`Page ${hdv["page"]}/${hdv["maxPage"]}`);
					return msg.edit(next);
					break;
				}
			});
			break;

			default:
			message.channel.send(configManager.getTranslation(message.author.id,"USAGE", ["$hdv <buy|show>"]));
			break;
		}
	}
}

module.exports = HDVCommand;