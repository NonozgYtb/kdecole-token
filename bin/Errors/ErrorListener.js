var normalizedPath = require("path").join(__dirname)
var required = []
require("fs").readdirSync(normalizedPath).forEach((file)=> {
	if(String(file) == "ErrorListener.js") return;
	let name = String(file).split(".").slice(0, -1).join(".");
	module.exports[name] = required[name] = require("./"+file);
})

convertDatas = (err) => {
	return {
		"ENOENT": ["FileNotFoundError", err.path]
	}
}

module.exports.convert = (err) => {
	if(convertDatas(err)[err.code] != undefined) {
		let name = convertDatas(err)[err.code][0]
		let args = convertDatas(err)[err.code].slice(1);
		let eerr = new required[name](...args);
		//console.error(new required[name](...args).stack, err.stack);
		return eerr;
	}
	return err
}
