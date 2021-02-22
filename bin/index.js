const {
	writefile,
	argsExtract,
	envGet,
	fsReadFileAsync,
	fsWriteFileAsync,
	gettingFile,
	Draft,
	chalk,
	Errors
} = require("./modules.js")

var path = "../.env";


let fn = (getter,path,verifCallback) => {
getter
	.then(token => {

		Draft.setDraft("gettoken", true);
		if(path) {
		/* .env Part */
		gettingFile(path)
			.then((pathVerified) => {
				envGet(pathVerified, "TOKEN", token).then(data => {
					if(typeof data == "string")
					writefile(path, data).then(verif => {
						verifCallback(verif, path, data);
					});
					else {
						throw new Errors.ParsingError();
					}
				})
				.catch((e)=>{});
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


//var getToken = require("kdecole-api").Kdecole.login(token, code);
var getToken = Promise.resolve(require("faker").random.uuid().toUpperCase().replaceAll("-", ""));
var tester = Promise.resolve("KDECOLE-TOKEN");
if(path) {
	Draft.init(true);
	fn(tester,path,()=>{
		if(Draft.getState("writefile") == true) {
			Draft.reset().init();
			fn(getToken, path, ()=>{});
		}
	});
}


