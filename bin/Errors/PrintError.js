

var fn = (err)=>{
	let errs = {
	"FileNotFoundError" : "Le fichier "+err.path+" n'existe pas ou n'est pas accesible."
}
	console.error("\n"+(errs[err.name] ?? err));
}

module.exports = fn;
