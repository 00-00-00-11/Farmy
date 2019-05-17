const Discord = require("discord.js");

// PRICES
const PRICE_WHEAT = 220;
const PRICE_BARLEY = 180;
const PRICE_POTATOES = 400;
const PRICE_PLOWMAN = 3000;

class ShopManager {

	processTrade(trader, target, amount, type){
		let data1 = global.configManager.getUserData(trader);
		let data2 = global.configManager.getUserData(target);
		amount = parseInt(amount);

		if(this.hasRessource(trader, amount, type)){
			switch(type){
				case "wheat":
				case "ble":
				case "blé":
				data1.wheat = data1.wheat - amount;
				data2.wheat = data2.wheat + amount;
				break;
				case "barley":
				case "orge":
				data1.barley = data1.barley - amount;
				data2.barley = data2.barley + amount;
				break;
				case "potatoe":
				case "patate":
				data1.potatoe = data1.potatoe - amount;
				data2.potatoe = data2.potatoe + amount;
				break;
			}
			global.configManager.writeData();
		}
	}

	hasRessource(userId, amount, type){
		let data = global.configManager.getUserData(userId);

		switch(type){
			case "wheat":
			if(data.wheat < amount){
				return false;
			}
			return true;
			break;
			case "barley":
			if(data.barley < amount){
				return false;
			}
			return true;
			break;
			case "potatoe":
			if(data.potatoe < amount){
				return false;
			}
			return true;
			break;
			default:
			return false;
			break;
		}
	}
}

module.exports = ShopManager;