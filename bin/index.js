#!/usr/bin/env node

const {
    argsExtract,
    Draft,
    chalk,
    assembler,
    Errors
} = require("./modules.js");

var {
    token,
    code,
    env,
    name,
    force
} = argsExtract(require("yargs").argv);

console.log("");

if (token == false || code == false) {
    console.log(chalk('\n' + 'Vous devez remplir la commande via :' + '\n' +
        'kdecole-token <id> <code> (.env) (TOKEN_NAME) (--force)' + '\n' +
        '	-i,  --id    Id du compte Kdecole' + '\n' +
        '	-c,  --code  Code de validation de l\'application mobile' + '\n' +
        '	-e,  --env <.env>   Modification du fichier (.env) avec TOKEN=<votre token>' + '\n' +
        '	-n,  --name  Nom de la variable dans le .env (Token par défault)' + '\n' +
        '	-f,  --force Forcer l\'écriture du .env en cas de dysfonctionnement du parseur' + '\n'));
    return;
}
Draft.init(env);
/*
env = "./env"; | path
token = "user.name";
code = "PASS1234WORD"; > Temp Cod
name = "TOKEN_KDECOLE";
name = "true";
*/
var getterGetToken = () => {
    //let getToken = require("kdecole-api").Kdecole.login(token, code);
    /* Tests with faker*/
    let getToken = Promise.resolve(require("faker").random.uuid().toUpperCase().replaceAll("-", ""));
    return getToken;
}
var tester = Promise.resolve("KDECOLE__TOKEN");
if (env) {
    assembler(tester, env, name, force, () => {
        if (Draft.getState("writefile") == true) {
            assembler(getterGetToken(), env, name, force, true);
        }
    });
} else {
    getterGetToken().then((token) => {
        Draft.setDraft("gettoken", true);
        console.log("Your Kdecole Token :\n" + token);
        console.log("");
    }).catch(err => {
        Draft.setDraft("gettoken", false);
        Errors.PrintError(Errors.convert(err))
    });
}


// TODO : Faire la mise en forme 
// TODO : La gestion d'erreur si le test n'a pas marché (Fait / A tester)
// TODO : Faire quand il n'y a pas de path
// TODO : Rajouter un draft special pour le print du token
