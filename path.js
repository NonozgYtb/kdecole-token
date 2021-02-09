const fs = require("fs");
const path = require("path")

function ma(pathIn) {
	return new Promise((resolve, reject)=>{
		fs.realpath(pathIn, (err, pather)=>{
			pather = String(pather).trim();
			if(pather == undefined) {reject(new Error('Path have to be defined')); return}
			if(err) {
				if(err.message.startsWith("ENOENT")) 
					err.messageFr = 'Le fichier ou le dossier précisé n\'existe pas';
				reject(err);
				return
			}
			var arr = [pather];
			!((pather)=>{
				try{
					let res = fs.statSync(pather).isDirectory() ? ".env" : undefined;
					if(res) arr[1] = res
				}catch(e) {
					reject(e);
					return
				}
			}
			)(pather)
			pather = path.join(...arr)
			console.log(...arr, pather);
			try {
				resolve(fs.existsSync(pather))
			} catch(e) {
				reject(e);
				return
			}
		})
	});
}
/*
fs.realpath("../Kdecole-pj", (err, pather)=>{
	pather = String(pather).trim();
	if(err) {
		if(err.message.startsWith("ENOENT"))
		console.error('Le fichier ou le dossier précisé n\'existe pas');
		else
		console.error(err.message); return
		}
	pather = path.join(pather,((pather)=>fs.statSync(pather).isDirectory() ? ".env" : "")(pather))
	try {
	return (fs.existsSync(pather))
} catch(e) {
	return false
}
})
console.log(a)

function abc() {
	return new Promise(resolve=> {
		setTimeout(()=>
		resolve("abc"), 2000)
	});
}*/

ma("../Kdecole-proj/").catch((e)=>console.log(e ?? e)).then(e=>console.log(e))
