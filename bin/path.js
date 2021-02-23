const fs = require("fs");
const path = require("path")
const chalk = require("chalk")
const Errors = require("./Errors/ErrorListener")
const {
	Draft
} = require("./draft.js")

var gettingFile = pathIn => new Promise((resolve, reject) => {
	fs.realpath(pathIn, (err, pather) => {
		if (pather == undefined || err) {
			Draft.setDraft('checkdir', false);
			Draft.setDraft('checkfile', false);
			returnErr = (err) ? new Errors.FileNotFoundError(err.path) : new Errors.EmptyDirError("empty input");
			reject(err);
			return
		}
		Draft.setDraft('checkdir', true);
		let arr = [pather];
		try {
			let res = fs.statSync(pather).isDirectory() ? ".env" : undefined;
			if (res) arr[1] = res
		} catch (e) {
			Draft.setDraft('checkfile', false);
			reject(new Errors.FileNotFoundError(pather));
			return
		}
		pather = path.join(...arr)
		try {
			let res = fs.existsSync(pather);
			if (res == false) {
				Draft.setDraft('checkfile', 0.5, chalk.italic.white("File not exist, I create the file !"));
				fs.writeFile(pather, "", {
					flag: "wx"
				}, (err) => {
					if (err)
						reject(err);
				});
			} else {
				Draft.setDraft('checkfile', true);
			}
			resolve(pather);
			return pather;
		} catch (e) {
			Draft.setDraft('checkfile', false);
			reject(new Errors.FileNotFoundError(pather));
			return
		}
	})
});

module.exports.gettingFile = gettingFile;

/* ! Use :
 * gettingFile("../Kdecole-proj/")
 * 	.then((path)=>{
 *		console.log(path)
 * 	})
 * 	.catch((e)=>{
 *			Errors.PrintError(Errors.convert(e))}
 * 	)
 */