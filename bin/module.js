const dotenv = require('dotenv');
const fs = require("fs");
const chalk = require("chalk");
const { Draft } = require("./draft.js");
Draft.init();
const Errors = require("./Errors/ErrorListener")

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

fsWriteFileAsync = (filename, data) => {
	return new Promise((resolve, reject)=>{
		fs.writeFile(filename, data, (err)=>{
			if(err)
				reject(err);
			else
				resolve(true);
		});
	});
}

var envModif = (path, token_name, token_value, force) => fsReadFileAsync(path)
	.then((e)=>{
		force ??= false;
		let returned = []
		let a = dotenv.parse(e.toString())
		if (Object.keys(a).length <= 0 && force !== true) {
			Draft.setDraft("getfile", 0.5, chalk.italic.white("Parse .env failed : Escape"))
			Draft.abort(["getfile"]);
			throw new Errors.ParsingError(path);
			return;
		}
		a[token_name]=token_value;
		Object.keys(a).forEach(key=> {
			returned.push(key.toUpperCase()+"="+a[key]);
		});
		returned = returned.join("\n");
		Draft.setDraft("getfile", true)
		return returned
	})
	.catch((err)=>{
		Draft.setDraft("getfile", (err.name == "ParsingError") ? 0.5 : false);
		Errors.PrintError(Errors.convert(err), true);
		return false;
	})

var argsExtract = (argv) => {
	let returned = [];
	returned["token"] = argv.token ?? argv.t ?? argv.id ?? argv.i ?? argv._[0];
	returned["code"] = argv.code ?? argv.c ?? argv._[1];
	returned["env"] = argv.env ?? argv.e ?? argv._[2];
	returned["name"] = argv.name ?? argv.n ?? argv._[3] ?? "TOKEN";
	return returned;
}

var writefile = (path, data) => {
	return fsWriteFileAsync(path, data).then(valid => {
		if(valid) {
					Draft.setDraft("writefile", true)
					return true;
		}
		else {
			throw new Errors.ForbiddenError(path);
			return;
		}
	}).catch(()=>Errors.PrintError(Errors.convert(err)));
}

var path = "../.env"

envModif(path, "HI", "How").then(data => {
		if(data === false || data === undefined) return;
		writefile(path, data);
		})
