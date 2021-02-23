function LogoutError(message,nomFichier, numeroLigne) {
	var instance = new Error('Logout failed (Error during the process), your logout is probably done.', nomFichier, numeroLigne);
	instance.name = 'LogoutError';
	instance.date = new Date();
	instance.code = "A-900";
	instance.errno = 900;
	Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
	if(Error.captureStackTrace) {
		Error.captureStackTrace(instance, LogoutError);
	}
	return instance;
}

LogoutError.prototype = Object.create(Error.prototype, {
	constructor: {
		value: Error,
		enumerable: false,
		writable: true,
		configurable: true
	}
});

module.exports = LogoutError
