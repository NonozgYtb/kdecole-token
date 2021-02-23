const dotenv = require('dotenv');
const fs = require("fs");
const chalk = require("chalk");
const Draft = require("./draft.js").Draft;
const Errors = require("./Errors/ErrorListener");
const {
	gettingFile
} = require("./path.js");

fsReadFileAsync = (filename, force) => {
	if (force)
		return Promise.resolve("");
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
		if (Object.keys(a).length <= 0 && force !== true && verifEmptyRaw.length > 0 && verifier !== true) {
			Draft.setDraft("getfile", 0.5, chalk.italic.white("Parse .env failed : Escape"));
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
	let toBool = (e) => {
		if (typeof e == "string" && (e.startsWith("f") || e.startsWith("0") || e.startsWith("n")))
			e = false;
		return Boolean(e);
	}
	returned["token"] = argv.token ?? argv.t ?? argv.id ?? argv.i ?? argv._[0] ?? false;
	returned["code"] = argv.code ?? argv.c ?? argv.password ?? argv.p ?? argv.m ?? argv._[1] ?? false;
	returned["env"] = argv.env ?? argv.e ?? argv._[2] ?? undefined;
	returned["name"] = argv.name ?? argv.n ?? argv._[3] ?? "KDECOLE_TOKEN";
	returned["force"] = toBool(argv.force ?? argv.f ?? false);
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

let assembler = (getter, path, tokenname, force, verifCallback) => {
	getter
		.then(token => {

			Draft.setDraft("gettoken", true);
			if (path) {
				/* .env Part */
				gettingFile(path)
					.then(pathVerified => {
						envGet(pathVerified, tokenname, token, force).then(data => {
								if (typeof data == "string")
									writefile(pathVerified, data).then(verif => {
										if (typeof verifCallback == "function")
											verifCallback(verif, path, data);
									});
								else {
									throw new Errors.ParsingError();
								}
							})
							.catch((e) => {});
					}).catch((err) => {
						Errors.PrintError(Errors.convert(err));
					});
				/* .env Part */
			}
		}).catch((err) => {
			Draft.setDraft("gettoken", false);
			Errors.PrintError(Errors.convert(err));
		});
}

module.exports = {
	writefile,
	argsExtract,
	envGet,
	fsReadFileAsync,
	fsWriteFileAsync,
	gettingFile,
	Draft,
	chalk,
	Errors,
	assembler
};
