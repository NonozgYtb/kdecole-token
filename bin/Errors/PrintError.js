

var fn = (err)=>{
	let errs = {
	"FileNotFoundError" : "Le fichier "+err.path+" n'existe pas ou n'est pas accesible.",
	"AuthFailedError" : "L'authentification n'a pas marché.\nCela est probablement dû a de mauvais identifiants.\nReéssayez l'opération avec un nouveau code d'activation."
}
	console.error((errs[err.name] ?? err));
	console.log("");
}

module.exports = fn;
