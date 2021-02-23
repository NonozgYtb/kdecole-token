const chalk = require("chalk");
require("draftlog").into(console)

const drafter = {
	"gettoken": "Getting token from API",
	"checkdir": "Checking Directory exist",
	"checkfile": "Checking File exist",
	"getfile": "Getting data from file",
	"writefile": "Writing file from new data"
}

const envNotExist = ["gettoken"];

const values = {
	true: chalk.green("OK"),
	false: chalk.red("ERROR"),
	null: chalk.white("..."),
	0.5: chalk.yellow("WARNING"),
	"abort": chalk.magentaBright("Aborted")
}

class Draft {
	constructor() {
		this._data = [];
		this.drafter = drafter;
		this.values = values;
		this._data.drafts = [];
		this._data.states = [];
		this._data.block = [];
		this._data.returnKeys = {};
		this._data.init = false;
	}
	init(envExist) {
		this._data.init = true;
		this._data.keys = Object.keys(drafter);
		this._data.keys.forEach((v,k)=>{this._data.returnKeys[v] = k})
		this._data.keys.forEach((e)=>{
			if(envExist == undefined && !envNotExist.includes(e))
				return;
			this._data.drafts[e] = console.draft(); 
			this._data.states[e] = null;
			this._data.block[e] = false;
			this.setDraft(e, null)
		});
		return this;
	}
	getDraft(key) {
		if(!this._data.init) return this;
		return this._data.drafts[key];
	}
	getState(key) {
		if(!this._data.init) return this;
		return this._data.states[key]
	}
	setDraft(key, value, add) {
		this._data.states[key] = value;
		add ??= "";
		if(this._data.block[key] !== true) {
			this._data.drafts[key](drafter[key]+"  "+values[value]+" "+add);
			if(value !== true && value !== null)
				this._data.block[key] = true;
		}
	}
	setDraftChain() {
		if(!this._data.init) return this;
		this.setDraft(...arguments);
	}
	abort(except) {
		except ??= [];
		var max = 0;
		except.forEach((e)=>{
			if(this._data.returnKeys[e] > max) 
				max = this._data.returnKeys[e];
		});
		Object.entries(this._data.states).forEach(e=>{
			if(e[1] !== false && e[1] !== 0.5 && !except.includes(e[0]) && this._data.returnKeys[e[0]] > max)
				this.setDraft(e[0], "abort");
			})
	}
}

const instance = new Draft();
//Object.freeze(instance);
module.exports.Draft = instance;

/*
for(let i = 0; i < instance._data.keys.length; i++) {
	setTimeout(()=>instance.setDraft(instance._data.keys[i], true), (i+1)*1000);
}
for(let i = 0; i < instance._data.keys.length; i++) {
	setTimeout(()=>instance.setDraft(instance._data.keys[i], false), (i+instance._data.keys.length+1)*1000);
}
for(let i = 0; i < instance._data.keys.length; i++) {
	setTimeout(()=>instance.setDraft(instance._data.keys[i], 0.5, "hi"+i), (i+(instance._data.keys.length*2)+1)*1000);
}*/
