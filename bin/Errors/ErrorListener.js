var normalizedPath = require("path").join(__dirname)
var required = []
require("fs").readdirSync(normalizedPath).forEach((file)=> {
	if(String(file) == "ErrorListener.js") return;
	let name = String(file).split(".").slice(0, -1).join(".");
	module.exports[name] = required[name] = require("./"+file);
})

convertDatas = (err) => {
	return {
		"ENOENT": ["FileNotFoundError", err.path],
		"EACCES": ["ForbiddenError", err.path],
		"L'authentification n'a pas fonctionné" : ["AuthFailedError"],
		"Un jeton d'accès doit être renseigné" : ["EmptyTokenError"],
		"Une erreur est survenue dans le traitement des données de déconnexion" : ["LogoutError"]
	}
}

module.exports.convert = (err) => {
	var errout = convertDatas(err)[err.code]
	if(errout == undefined)
		errout = convertDatas(err)[err.message]
	if(errout != undefined) {
		let name = errout[0]
		let args = errout.slice(1);
		let eerr = new required[name](...args);
		//console.error(new required[name](...args).stack, err.stack);
		return eerr;
	}
	return err
}
