const dotenv = require('dotenv');
const fs = require("fs");
const chalk = require("chalk");

const { Draft } = require("./draft.js");

fs.readFileAsync = (filename) => {
	return new Promise((resolve, reject)=>{
		fs.readFile(filename, (err, data)=>{
			if(err)
				reject(err);
			else
				resolve(data);
		});
	});
}

fs.readFileAsync("../.env")
	.then((e)=>{
		let returned = []
		let a = dotenv.parse(e.toString())
		console.dir(a);
		a = (a=>{a["ME"]="dsj"; return a})(a)
		Object.keys(a).forEach(key=> {
			returned.push(key+"="+a[key]);
		});
		returned = returned.join("\n");
		return returned
	})
	.catch((err)=>{
		console.error(err)
	}) // stop
	.then(envstr => {console.log(envstr);
			fs.writeFile("../.env", envstr, (err)=>{
				if(err)
					Errors.PrintError(Errors.convert(err));
				else
					console.log("Writing file " + chalk.green("OK"));
			});
		});
	
	/*fnchange = (data) = {
	 * 	data["value"] = token;
	 * 	return data;
	 *}
	 */

module.exports.readFileAsync = fs.readFileAsync;
