const fs = require("fs");
const path = require("path")
const chalk = require("chalk")
const Errors = require("./Errors/ErrorListener")
require("draftlog").into(console)

function gettingFile(pathIn) {
	var draftDirVar = console.draft();
	function draftDir(bool_str) {
		if(bool_str=="start") {
			draftDirVar("Checking dir exist ...");
		}
		else if(bool_str) {
			draftDirVar("Checking dir exist " + chalk.green("OK"));
		}else{
			draftDirVar("Checking dir exist " + chalk.red("ERROR"));
		}
	};
	var draftFileVar = console.draft();
	function draftFile(bool_str) {
		if(bool_str=="start") {
			draftFileVar("Checking file exist ...");
		}
		else if(bool_str) {
			draftFileVar("Checking file exist " + chalk.green("OK"));
			draftDir(true);
		}else{
			draftFileVar("Checking file exist " + chalk.red("ERROR"));
		}
	};
	draftFile("start");
	draftDir("start");
	console.log("");
	return new Promise((resolve, reject)=>{
		fs.realpath(pathIn, (err, pather)=>{
			pather = String(pather).trim();
			if(pather == undefined) {
				draftDir(false);
				draftFile(false);
				reject(new Errors.EmptyDirError("empty input")); 
				return
			}
			if(err) {
				draftDir(false);
				draftFile(false);
				reject(new Errors.FileNotFoundError(err.path));
				return
			}
			draftDir(true);
			let arr = [pather];
			!((pather)=>{
				try{
					let res = fs.statSync(pather).isDirectory() ? ".env" : undefined;
					if(res) arr[1] = res
				}catch(e) {
					draftFile(false);
					reject(new Errors.FileNotFoundError(pather));
					return
				}
			}
			)(pather)
			pather = path.join(...arr)
			try {
				let res = fs.existsSync(pather);
				if(res) {	
					draftFile(true);
					resolve(res);
					return;
				}else{

					draftFile(false);
					reject(new Errors.FileNotFoundError(pather));
					return;
				}
			} catch(e) {
				draftFile(false);
				reject(new Errors.FileNotFoundError(pather));
				return
			}
		})
	});
}

module.exports.gettingFile = gettingFile;

/* ! Use :
 * gettingFile("../Kdecole-proj/")
 * 	.then((e)=>{
 *		console.log(e ? "yes" : "false")
 * 	})
 * 	.catch((e)=>{
 *			Errors.PrintError(Errors.convert(e))}
 * 	)
 */
