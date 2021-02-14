#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const { gettingFile } = require("./path.js");
const Errors = require("./Errors/ErrorListener")

var argv = require("yargs").argv;

var token = argv.token ?? argv.t ?? argv.id ?? argv.i ?? argv._[0];
var code = argv.code ?? argv.c ?? argv._[1];
var env = argv.env ?? argv.e ?? argv._[2];
if(env === true) {env = ""}

var tokFunc = () => {
	var tok = require("kdecole-api").Kdecole.login(token, code);
    tok
      .then((e) => console.log(e))
      .catch((e) => {
        Errors.PrintError(Errors.convert(e));
      });
}

//console.log(process.cwd());
console.log("")
if (token == undefined ?? code == undefined ?? argv.h ?? argv.help)
  console.log(chalk(`Vous devez remplir la commande via :
kdecole-token <id> <code> (.env)
	-i,  --id    Id du compte Kdecole
	-c,  --code  Code de validation de l'application mobile
	-e,  -env <.env>   Modification du fichier (.env) avec TOKEN=<votre token>`)+"\n");
else {
  try {
		if(env !== undefined) {
			gettingFile(env)
				.then((e) => {
					console.log(e ? 0 : 1);	
					tokFunc();
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
