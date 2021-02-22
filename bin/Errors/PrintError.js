const chalkFn = require("chalk")

var fn = (err, chalk)=>{
	let errs = {
		"FileNotFoundError" : "Le fichier "+err.path+" n'existe pas ou n'est pas accesible.",
		"AuthFailedError" : "L'authentification n'a pas marché.\nCela est probablement dû a de mauvais identifiants.\nReéssayez l'opération avec un nouveau code d'activation.",
		"ParsingError" : "Le parsing (Récupération des données)"+((err.path != undefined) ? " du fichier "+err.path : "")+" n'a pas marché, vérifiez que la syntaxe de ce fichier est correcte."
	}
	console.log("");
	if(errs[err.name]) {
		if(chalk)
			console.log(chalkFn.red(errs[err.name]));
		else
			console.log(errs[err.name]);
	}
	console.error(err);
	console.log("");
}

module.exports = fn;
