function EmptyTokenError(message,nomFichier, numeroLigne) {
	var instance = new Error('Token must be specified', nomFichier, numeroLigne);
	instance.name = 'EmptyTokenError';
	instance.date = new Date();
	instance.code = "A-300";
	instance.errno = 300;
	Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
	if(Error.captureStackTrace) {
		Error.captureStackTrace(instance, EmptyTokenError);
	}
	return instance;
}

EmptyTokenError.prototype = Object.create(Error.prototype, {
	constructor: {
		value: Error,
		enumerable: false,
		writable: true,
		configurable: true
	}
});

module.exports = EmptyTokenError
