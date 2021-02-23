function FileNotFoundError(message_path, nomFichier, numeroLigne) {
	var instance = new Error('File Not Found : '+message_path, nomFichier, numeroLigne);
	instance.name = 'FileNotFoundError';
	instance.date = new Date();
	instance.code = "F-101";
	instance.errno = 101;
	instance.path = message_path
	Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
	if(Error.captureStackTrace) {
		Error.captureStackTrace(instance, FileNotFoundError);
	}
	return instance;
}

FileNotFoundError.prototype = Object.create(Error.prototype, {
	constructor: {
		value: Error,
		enumerable: false,
		writable: true,
		configurable: true
	}
});

module.exports = FileNotFoundError
