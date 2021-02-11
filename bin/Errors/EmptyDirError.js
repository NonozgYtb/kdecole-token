function EmptyDirError(message, nomFichier, numeroLigne) {
	var instance = new Error('Dir have to be specified : '+message, nomFichier, numeroLigne);
	instance.name = 'EmptyDirError';
	instance.date = new Date();
	instance.code = "F-200";
	instance.errno = 200;
	instance.path = undefined;
	Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
	if(Error.captureStackTrace) {
		Error.captureStackTrace(instance, EmptyDirError);
	}
	instance.stack.split("\n").slice(2).join("\n");
	return instance;
}

EmptyDirError.prototype = Object.create(Error.prototype, {
	constructor: {
		value: Error,
		enumerable: false,
		writable: true,
		configurable: true
	}
});

module.exports = EmptyDirError
