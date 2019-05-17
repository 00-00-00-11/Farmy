const fs = require("fs");
const Utils = require("../utils/Utils");

class HDV {

	constructor(){
		this.hdv = JSON.parse(fs.readFileSync("./db/hdv.json", "utf8"));
	}

	registerAuction(seller, ressource, amount, price){
		let id = global.configManager.getAuctionId();

		this.hdv[id] = {
			seller: seller,
			ressource: ressource,
			amount: amount,
			price: price,
			id: id
		};
		global.configManager.writeHdv();
	}

	getAuctionData(id){
		return this.hdv[id];
	}

	getAllAuctions(){
		let data = this.hdv;
		let allAuctions = [];
		let key = 0;

		for(let id in data){
			let aData = this.getAuctionData(id);
			let json = {};
			json[key] = {
				seller: aData.seller,
				ressource: aData.ressource,
				amount: aData.amount,
				price: aData.price,
				id: aData.id
			};
			allAuctions.push(json[key]);
			key++;
		}
		return allAuctions;
	}

	sortHdv(pageid, userId){
		let askPage = pageid;
		let page = pageid-1;
		let auctions = this.getAllAuctions();
		let array = Utils.array_chunks(auctions, 10);
		let data = (array[page]); let maxPage = array.length;
		if(!data){ data=array[0]; askPage=1; }
		var pageList = "";
		data.forEach(item => {
			pageList += configManager.getTranslation(userId, "HDV_ENTRY", [item.id, item.ressource, item.amount, global.bot.users.get(item.seller).tag, item.price]);
		});
		return { pageList: pageList, page: askPage, maxPage: maxPage };
	}
}

module.exports = HDV;