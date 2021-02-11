#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const {gettingFile} = require("./path.js")

var argv = require("yargs").argv;

const greeting = chalk.blue("Hello");

var token = argv.token ?? argv.t ?? argv.id ?? argv.i ?? argv._[0]
var code = argv.code ?? argv.c ?? argv._[1]
var env = argv.env ?? argv.e ?? argv._[2] ?? process.cwd();
console.log(process.cwd())
if(token == undefined ?? code == undefined ?? argv.h ?? argv.help) console.log(chalk(`Vous devez remplir la commande via :
kdecole-token <id> <code> (.env)
	-i,  --id    Id du compte Kdecole
	-c,  --code  Code de validation de l'application mobile
	-e,  -env <.env>   Modification du fichier (.env) avec TOKEN=<votre token>`))
else {
	try {
		gettingFile("../Kdecole-proj/")
  	.then((e)=>{
 		console.log(e ? "yes" : "false")
  	})
  	.catch((e)=>{
 			Errors.PrintError(Errors.convert(e))}
 	)
		var tok = require("kdecole-api").default.login("me","th");
		tok.then(e=>console.log(e)).catch((e)=>{console.log(chalk.red(e.message))});
		console.log(greeting, token, yes )
	}catch(e){}
}
