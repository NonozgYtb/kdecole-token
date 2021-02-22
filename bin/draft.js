const chalk = require("chalk");
require("draftlog").into(console)

const drafter = {
	"checkdir": "Checking Directory exist",
	"checkfile": "Checking File exist",
	"getfile": "Getting data from file",
	"writingfile": "Writing file from new data"
}

const values = {
	true: chalk.green("OK"),
	false: chalk.red("ERROR"),
	null: chalk.grey("...")
}

class Draft {
	constructor() {
		this._data = [];
	}
	init() {
		this._data.drafts = [];
		this._data.keys = Object.keys(drafter);
		this._data.keys.forEach((e)=>{
			this._data.drafts[e] = console.draft(); 
			this.setDraft(e, null)
		});
		return this;
	}
	getDraft(key) {
		return this._data.drafts[key];
	}
	setDraft(key, value) {
		/* true : success
		 * false : error
		 * null : idle
		 */
		this._data.drafts[key](drafter[key]+"  "+values[value]);
		return this.getDraft(key);
	}
	setDraftChain(key, value) {
		this.setDraft(key, value);
		return this;
	}
}

const instance = new Draft();
Object.freeze(instance);
module.exports.Draft = instance;
