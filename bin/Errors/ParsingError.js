function ParsingError(path, nomFichier, numeroLigne) {
	var instance = new Error('Parsing Error', nomFichier, numeroLigne);
	instance.name = 'ParsingError';
	instance.date = new Date();
	instance.code = "F-800";
	instance.errno = 800;
	instance.path = path;
	Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
	if(Error.captureStackTrace) {
		Error.captureStackTrace(instance, ParsingError);
	}
	instance.stack.split("\n").slice(2).join("\n");
	return instance;
}

ParsingError.prototype = Object.create(Error.prototype, {
	constructor: {
		value: Error,
		enumerable: false,
		writable: true,
		configurable: true
	}
});

module.exports = ParsingError
