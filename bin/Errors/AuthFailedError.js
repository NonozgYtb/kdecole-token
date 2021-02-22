function AuthFailedError(message,nomFichier, numeroLigne) {
	var instance = new Error('Authentification failed', nomFichier, numeroLigne);
	instance.name = 'AuthFailedError';
	instance.date = new Date();
	instance.code = "A-400";
	instance.errno = 400;
	Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
	if(Error.captureStackTrace) {
		Error.captureStackTrace(instance, AuthFailedError);
	}
	instance.stack.split("\n").slice(2).join("\n");
	return instance;
}

AuthFailedError.prototype = Object.create(Error.prototype, {
	constructor: {
		value: Error,
		enumerable: false,
		writable: true,
		configurable: true
	}
});

module.exports = AuthFailedError
