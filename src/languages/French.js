const translates = {
	"NOT_REGISTERED": ":warning: | Vous n'êtes pas enregistré!",
	"REGISTERED": "Vous avez été enregistré avec succès.",
	"ALREADY_REGISTERED": ":warning: | Vous êtes déjà enregistré!",
	"ERROR": "Une erreur est survenue, réessayez plus tard.",
	"INVENTORY_TITLE": "Inventaire de %",
	"TRACTOR": "Tracteur",
	"WHEAT": "Blé",
	"BARLEY": "Orge",
	"POTATOE": "Pomme(s) de terre",
	"YES": "Oui",
	"NO": "Non",
	"BALANCE": "Argent",
	"SET_LANGUAGE": "Le langage a été mis à jour pour : %",
	"FIELD_NOT_READY": "Votre champ n'est pas prêt! Réessayez dans %",
	"RECOLT_FIELD": "Vous avez récolter votre champ.",
	"TRADE_CONFIRM": "Vous êtes sur le point de donner % (x%) à %.\nConfirmez ou annulez.",
	"SPECIFY_AMOUNT": "Veuillez spécifier un montant.",
	"RESSOURCE_NOT_FOUND": "Ressource introuvable.",
	"SELF_TRADE": "Vous ne pouvez pas donner à vous même.",
	"USER_NOT_FOUND": "Utilisateur introuvable, veuillez vérifier qu'il est bien enregistré.",
	"ENOUGHT_RESSOURCE": "Vous n'avez pas les ressources suffisante.",
	"EMBED_TITLE_TRADE_CONFIRM": "Confirmation",
	"TRADE_SUCCESS": "Echange terminé avec succès.",
	"TRADE_CANCELLED": "Echange annulé.",
	"LEADERBOARD_ENTRY": "%. % avec %\n",
	"USAGE": "Usage : %",
	"HDV_ENTRY": "#% | % (x%) par % pour %$\n"
}

class French { // Inspired by VirVolta.
	get translates(){
		return translates;
	}
}

module.exports = French;