const dotenv = require('dotenv');
const fs = require("fs");
const chalk = require("chalk");

fsReadFileAsync = (filename) => {
	return new Promise((resolve, reject)=>{
		fs.readFile(filename, (err, data)=>{
			if(err)
				reject(err);
			else
				resolve(data);
		});
	});
}

var envModif = (path, token_name, token_value) => fsReadFileAsync(path)
	.then((e)=>{
		let returned = []
		let a = dotenv.parse(e.toString())
		console.dir(a);
		a = (a=>{a[token_name]=token_value; return a})(a)
		Object.keys(a).forEach(key=> {
			returned.push(key+"="+a[key]);
		});
		returned = returned.join("\n");
		return returned
	})
	.catch((err)=>{
		console.error(err)
	});
			
var envWriting = (pather, data, draft) => fs.writeFile(pather, data, (err)=>{
				if(err)
					Errors.PrintError(Errors.convert(err));
					draft("Writing file " + chalk.red("ERROR"));
				else
					draft("Writing file " + chalk.green("OK"));
			});

var argsExtract (argv) => {
	let returned = [];
	returned["token"] = argv.token ?? argv.t ?? argv.id ?? argv.i ?? argv._[0];
	returned["code"] = argv.code ?? argv.c ?? argv._[1];
	returned["env"] = argv.env ?? argv.e ?? argv._[2];
	returned["name"] = argv.name ?? argv.n ?? argv._[3] ?? "TOKEN";
	return returned;
}
