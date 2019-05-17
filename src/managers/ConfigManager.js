const Discord = require("discord.js");
const fs = require("fs");

const French = require("../languages/French");
const English = require("../languages/English");

class ConfigManager {

	constructor(){
		this.dbUsers = JSON.parse(fs.readFileSync("./db/users.json", "utf8"));
		this.countdowns = JSON.parse(fs.readFileSync("./db/countdowns.json", "utf8"));
		this.botConfig = JSON.parse(fs.readFileSync("./config.json", "utf8"));
	}

	get botPrefix(){
		return this.botConfig.prefix;
	}

	get isBlocked(){
		return this.botConfig.blocked;
	}

	get ownerId(){
		return this.botConfig.ownerId;
	}

	get config(){
		return this.botConfig;
	}

	getAuctionId(){
		this.config["auctionId"]++;
		this.writeConfig();
		return this.config["auctionId"];
	}

	isRegistered(userId){
		if(!this.dbUsers[userId]){
			return false;
		} 
		else {
			return true;
		}
	}

	registerUser(userId, username){
		this.dbUsers[userId] = {
			lang: "en",
			userId: userId,
			balance: 0,
			harvester: 0, 
			wheat: 0,
			barley: 0,
			potatoe: 0,
			size1: 50,
			growed1: false,
			size2: 50,
			growed2: false,
			size3: 50,
			growed3: false
		};
		this.writeData();

		this.countdowns[userId] = {
			harvest1: 7200,
			harvest2: 7200,
			harvest3: 7200,
			daily: 86400
		};
		this.writeCountdowns();
	}

	harvest(userId, id){
		let countdowns = this.getUserCountdowns(userId);
		let data = this.getUserData(userId);

		switch(id){
			case 1:
			data.growed1 = false;
			countdowns.harvest1 = 7200;
			break;
			case 2:
			data.growed2 = false;
			countdowns.harvest2 = 7200;
			break;
			case 3:
			data.growed3 = false;
			countdowns.harvest3 = 7200;
			break;
		}

		this.writeData();
		this.writeCountdowns();
	}

	isGrowed(userId, id){
		let data = this.getUserData(userId);

		switch(id){
			case 1:
			if(data.growed1){
				return true;
			}
			return false;
			break;

			case 2:
			if(data.growed2){
				return true;
			}
			return false;
			break;

			case 3:
			if(data.growed3){
				return true;
			}
			return false;
			break;
			
			default:
			return false;
			break;
		}
	}

	getLang(userId){
		let userData = (this.getUserData(userId));

		if(!userData){
			return new English();
		} else {
			switch(userData.lang){
				case "en":
				return new English();
				break;

				case "fr":
				return new French();
				break;
			}
		}
	}

	getTranslation(userId, entry, args = []){
		let lang = this.getLang(userId);
		let lul = lang.translates[entry];
		args.forEach(arg => {
			lul.replace(/[%]/, arg);
		});
		return lul;
	}

	// OTHERS

	intToTime(seconds){
		let time = parseFloat(seconds).toFixed(3),
		hour = Math.floor(time / 60 / 60),
		mins = Math.floor(time / 60) % 60,
		secs = Math.floor(time - mins * 60);

		return ('000' + hour).slice(2 * -1) + "h" + ('000' + mins).slice(2 * -1) + "min(s)";
	}

	getUserData(userId){
		return this.dbUsers[userId];
	}

	getAllData(){
		return this.dbUsers;
	}

	getAllDataInArray(){
		let data = this.getAllData();
		let allUsersData = [];
		let key = 0;

		for(let userId in data){
			let userData = this.getUserData(userId);
			let json = {};
			json[key] = {
				wheat: userData.wheat,
				barley: userData.barley,
				potatoe: userData.potatoe,
				userId: userId
			};
			allUsersData.push(json[key]);
			key++;
		}
		return allUsersData;
	}

	getUserCountdowns(userId){
		return this.countdowns[userId];
	}

	getGrowTime(userId, id){
		let data = this.getUserCountdowns(userId);
		
		switch(id){
			case 1:
			return this.intToTime(data.harvest1);
			break;
			case 2:
			return this.intToTime(data.harvest2);
			break;
			case 3:
			return this.intToTime(data.harvest3);
			break;
		}
	}

	stringToRessource(string){
		switch(string){
			case "ble":
			case "blé":
			case "wheat":
			return "wheat";
			break

			case "orge":
			case "barley":
			return "barley";
			break;

			case "patate":
			case "potatoe":
			return "potatoe";
			break;
		}
	}

	getBalance(userId){
		let data = this.getUserData(userId);
		let balance = data.balance;

		if(balance > 999){
			return (balance/1000).toFixed(1) + "k";
		}
		return balance;
	}

	setLanguage(userId, lang){
		let data = this.getUserData(userId);
		data.lang = lang;
		this.writeData();
	}

	writeData(){
		fs.writeFileSync("./db/users.json", JSON.stringify(this.dbUsers), (err) => {
			if(err) console.error(err);
		});
	}

	writeHdv(){
		fs.writeFileSync("./db/hdv.json", JSON.stringify(global.hdv.hdv, 4), (err) => {
			if(err) console.error(err);
		});
	}

	writeConfig(){
		fs.writeFileSync("./config.json", JSON.stringify(this.config, 4), (err) => {
			if(err) console.error(err);
		});
	}

	writeCountdowns(){
		fs.writeFileSync("./db/countdowns.json", JSON.stringify(this.countdowns), (err) => {
			if(err) console.error(err);
		});
	}

	async reduceCountdowns(){
		let data = this.countdowns;

		for(let key in data){
			let userCountdowns = this.getUserCountdowns(key);
			let userData = this.getUserData(key);

			if(userCountdowns.harvest1 <= 0){
				userData.growed1 = true;
			} else {
				userCountdowns.harvest1 = userCountdowns.harvest1 - 1;
			}
			if(userCountdowns.harvest2 <= 0){
				userData.growed2 = true;
			} else {
				userCountdowns.harvest2 = userCountdowns.harvest2 - 1;
			}
			if(userCountdowns.harvest3 <= 0){
				userData.growed3 = true;
			} else {
				userCountdowns.harvest3 = userCountdowns.harvest3 - 1;
			}
		}
		this.writeCountdowns();
		this.writeData();
	}
}

module.exports = ConfigManager;