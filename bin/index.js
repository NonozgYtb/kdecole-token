#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const fs = require("fs");
const { gettingFile } = require("./path.js");
const Errors = require("./Errors/ErrorListener")

var argv = require("yargs").argv;

var token = argv.token ?? argv.t ?? argv.id ?? argv.i ?? argv._[0];
var code = argv.code ?? argv.c ?? argv._[1];
var env = argv.env ?? argv.e ?? argv._[2];
var name = argv.name ?? argv.n ?? argv._[3] ?? "TOKEN";
if (env === true) {
    env = "./"
}

var tokFunc = (dir) => {
    //var tok = require("kdecole-api").Kdecole.login(token, code);
    var tok = Promise.resolve(require("faker").random.uuid().toUpperCase().replaceAll("-",""));
    tok
      .then((e) => {
	console.log(e);
	fs.writeFile(dir, e, (err)=>{
	  if(err)
	    Errors.PrintError(Errors.convert(err));
	  else
	    console.log("Writing file " + chalk.green("OK"));
	});
      })
      .catch((e) => {Errors.PrintError(Errors.convert(e));});
}

//console.log(process.cwd());
console.log("")
if (token == undefined ?? code == undefined ?? argv.h ?? argv.help)
    console.log(chalk(`Vous devez remplir la commande via :
kdecole-token <id> <code> (.env) (TOKEN_NAME)
	-i,  --id    Id du compte Kdecole
	-c,  --code  Code de validation de l'application mobile
	-e,  --env <.env>   Modification du fichier (.env) avec TOKEN=<votre token>
	-n,  --name  Nom de la variable dans le .env (Token par défault)`) + "\n");
else {
    try {
        if (env !== undefined) {
            gettingFile(env)
                .then((e) => {
                    tokFunc(e);
                })
                .catch((e) => {
                    Errors.PrintError(Errors.convert(e));
                });
        } else {
            tokFunc();
        }
    } catch (e) {
        console.log(e);
    }
}
