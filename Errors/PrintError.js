const chalkFn = require("chalk")

var fn = (err, chalk)=>{
	let errs = {
		"FileNotFoundError" : "Le fichier "+err.path+" n'existe pas ou n'est pas accesible. "+chalkFn.italic("avec mkdir pour créer le dossier, touch pour créer le fichier ou chmod pour modifier les permissions)"),
		"AuthFailedError" : "L'authentification n'a pas marché.\nCela est probablement dû a de mauvais identifiants.\nReéssayez l'opération avec un nouveau code d'activation.",
		"ParsingError" : "Le parsing (Récupération des données)"+((err.path != undefined) ? " du fichier "+err.path : "")+" n'a pas marché, vérifiez que la syntaxe de ce fichier est correcte.",
		"ForbiddenError" : "L'accès"+((err.path != undefined) ? " du fichier "+err.path : " à un fichier")+" est interdit, vérifiez les permissions."
	}
	console.log("");
	if(chalk !== "tokenErr")
		console.log(chalkFn.italic.cyan("Le test de fonctionnement n'a pas bien marché, mais le code donné par votre ENT reste valable pour d'autres essai (sauf contreindication de votre ENT) !\n"));
	if(errs[err.name]) {
		if(chalk == true)
			console.log(chalkFn.red(errs[err.name]));
		else
			console.log(errs[err.name]);
	}else
		console.error(err);
	console.log("");
}

module.exports = fn;
