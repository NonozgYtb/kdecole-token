function ForbiddenError(message_path, nomFichier, numeroLigne) {
	var instance = new Error('Access Forbidden : '+message_path, nomFichier, numeroLigne);
	instance.name = 'ForbiddenError';
	instance.date = new Date();
	instance.code = "F-500";
	instance.errno = 500;
	instance.path = message_path
	Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
	if(Error.captureStackTrace) {
		Error.captureStackTrace(instance, ForbiddenError);
	}
	let cl = instance.stack.split("\n")
	cl.splice(1,1)
	let sta = cl.join("\n");
	instance.stack = sta;
	return instance;
}

ForbiddenError.prototype = Object.create(Error.prototype, {
	constructor: {
		value: Error,
		enumerable: false,
		writable: true,
		configurable: true
	}
});

module.exports = ForbiddenError
