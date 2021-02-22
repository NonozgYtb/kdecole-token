const dotenv = require('dotenv');
const fs = require("fs");
const chalk = require("chalk");
const Draft = require("./draft.js").Draft;
const Errors = require("./Errors/ErrorListener");
const {
	gettingFile
} = require("./path.js");

fsReadFileAsync = (filename) => {
	return new Promise((resolve, reject) => {
		fs.readFile(filename, (err, data) => {
			if (err)
				reject(err);
			else
				resolve(data);
		});
	});
}

fsWriteFileAsync = (filename, data) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(filename, data, (err) => {
			if (err)
				reject(err);
			else
				resolve(true);
		});
	});
}

var envGet = (path, token_name, token_value, force) => fsReadFileAsync(path)
	.then((e) => {
		force ??= false;
		let returned = [];
		let a = dotenv.parse(e.toString());
		var verifEmptyRaw = e.toString().replaceAll(/\n|\t|{|}|\s/g, "");
		if (Object.keys(a).length <= 0 && force !== true && verifEmptyRaw.length > 0) {
			Draft.setDraft("getfile", 0.5, chalk.italic.white("Parse .env failed : Escape"))
			throw new Errors.ParsingError(path);
			return new Errors.ParsingError(path);
		}
		a[token_name] = token_value;
		Object.keys(a).forEach(key => {
			returned.push(key.toUpperCase() + "=" + a[key]);
		});
		returned = returned.join("\n");
		Draft.setDraft("getfile", true)
		return returned
	})
	.then((data) => {
		if (data === false) {
			Draft.setDraft("getfile", false);
			throw new ParsingError();
			return new ParsingError();
		}
		return data;
	})
.catch((err) => {
	Draft.setDraft("getfile", (err.name == "ParsingError") ? 0.5 : false);
	Errors.PrintError(Errors.convert(err), true);
})

var argsExtract = (argv) => {
	let returned = [];
	returned["token"] = argv.token ?? argv.t ?? argv.id ?? argv.i ?? argv._[0];
	returned["code"] = argv.code ?? argv.c ?? argv._[1];
	returned["env"] = argv.env ?? argv.e ?? argv._[2];
	returned["name"] = argv.name ?? argv.n ?? argv._[3] ?? "TOKEN";
	returned["force"] = argv.force ?? argv.f ?? false;
	return returned;
}

var writefile = (path, data) => {
	return fsWriteFileAsync(path, data).then(valid => {
		if (valid) {
			Draft.setDraft("writefile", true);
			return true;
		} else {
			Draft.setDraft("writefile", false);
			throw new Errors.ForbiddenError(path);
			return;
		}
	}).catch((err) => {
		Draft.setDraft("writefile", false);
		Errors.PrintError(Errors.convert(err), true);
		});
}
/*
var path = "../.env";
gettingFile(path)
	.then((path) => {
		envGet(path, "HI", "How").then(data => {
			if (data === false || data === undefined) return;
			writefile(path, data).then(verif => {
				if (verif == true)
					console.log(chalk.green("ProcessEnd"));
			});
		})

	})
	.catch((err) => {
		Errors.PrintError(Errors.convert(err));
	});*/

module.exports = {
	writefile,
	argsExtract,
	envGet,
	fsReadFileAsync,
	fsWriteFileAsync,
	gettingFile,
	Draft,
	chalk,
	Errors
};
