const translates = {
	"NOT_REGISTERED": ":warning: | You are not registered!",
	"REGISTERED": "You have been successfully registered.",
	"ALREADY_REGISTERED": ":warning: | You are already registered!",
	"ERROR": "An error occured, try again later.",
	"INVENTORY_TITLE": "Inventory of %",
	"TRACTOR": "Tractor",
	"WHEAT": "Wheat",
	"BARLEY": "Barley",
	"POTATOE": "Potatoes",
	"YES": "Yes",
	"NO": "No",
	"BALANCE": "Balance",
	"SET_LANGUAGE": "The language has been updated to : %",
	"FIELD_NOT_READY": "Your field isn't ready! Retry in %",
	"RECOLT_FIELD": "You have harvested your field.",
	"TRADE_CONFIRM": "You are about to give % (x%) to %.\nConfirm or cancel.",
	"SPECIFY_AMOUNT": "Specify an amount.",
	"RESSOURCE_NOT_FOUND": "Ressource not found.",
	"SELF_TRADE": "You can't give to yourself.",
	"USER_NOT_FOUND": "User not found.",
	"ENOUGHT_RESSOURCE": "You have enought ressources.",
	"EMBED_TITLE_TRADE_CONFIRM": "Confirmation",
	"TRADE_SUCCESS": "Trade finished successfully.",
	"TRADE_CANCELLED": "Trade cancelled.",
	"LEADERBOARD_ENTRY": "%. % with %\n",
	"USAGE": "Usage : %",
	"HDV_ENTRY": "#% | % (x%) by % for %$\n"
}

class English { // Inspired by VirVolta.
	get translates(){
		return translates;
	}
}

module.exports = English;