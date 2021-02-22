const chalk = require("chalk");
require("draftlog").into(console)

const drafter = {
	"checkdir": "Checking Directory exist",
	"checkfile": "Checking File exist",
	"getfile": "Getting data from file",
	"writefile": "Writing file from new data"
}

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
		this._data.init = false;
	}
	init() {
		this._data.init = true;
		this._data.drafts = [];
		this._data.states = []
		this._data.keys = Object.keys(drafter);
		this._data.keys.forEach((e)=>{
			this._data.drafts[e] = console.draft(); 
			this._data.states[e] = null;
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
		if(!this._data.init) return this;
		this._data.states[key] = value;
		add ??= "";
		this._data.drafts[key](drafter[key]+"  "+values[value]+" "+add);
		if(value === false)
			this.abort([key]);
		return this.getDraft(key);
	}
	setDraftChain() {
		if(!this._data.init) return this;
		this.setDraft(...arguments);
	}
	abort(except) {
		except ??= [];
		Object.entries(this._data.states).forEach(e=>{
			if(e[1] == null && !except.includes(e[0]))
				this.setDraft(e[0], "abort");
			});
	}
}

const instance = new Draft();
Object.freeze(instance);
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
