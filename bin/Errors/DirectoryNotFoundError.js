function DirectoryNotFoundError(message_path, nomFichier, numeroLigne) {
	var instance = new Error('Directory Not Found : '+message_path, nomFichier, numeroLigne);
	instance.name = 'DirectoryNotFoundError';
	instance.date = new Date();
	instance.code = "F-102";
	instance.errno = 102;
	instance.path = message_path
	Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
	if(Error.captureStackTrace) {
		Error.captureStackTrace(instance, DirectoryNotFoundError);
	}
	instance.stack.split("\n").slice(2).join("\n");
	return instance;
}

DirectoryNotFoundError.prototype = Object.create(Error.prototype, {
	constructor: {
		value: Error,
		enumerable: false,
		writable: true,
		configurable: true
	}
});

module.exports = DirectoryNotFoundError
