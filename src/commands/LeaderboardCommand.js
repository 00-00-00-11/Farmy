const Discord = require("discord.js");
const arraySort = require("array-sort");

class LeaderboardCommand {

	static getName(){
		return "top";
	}

	static async execute(bot, message, args){
		var allData = global.configManager.getAllDataInArray();
		let wheats = arraySort(allData, "wheat", { reverse: true });
		let wheatLead = "";
		let count = 1;

		wheats.forEach(data => {
			if(count < 11 && data.wheat !== 'undefined'){
				let user = bot.users.get(data.userId);
				wheatLead += configManager.getTranslation(message.author.id,"LEADERBOARD_ENTRY", [count, user.tag, data.wheat]);
				count++;
			} else {
				count = 1;
				return;
			}
		});

		let e = new Discord.RichEmbed()
		.setTitle("Leaderboards")
		.addField(configManager.getTranslation(message.author.id,"WHEAT"), wheatLead)
		message.channel.send(e);
	}
}

module.exports = LeaderboardCommand;