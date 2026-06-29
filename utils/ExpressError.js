class ExpressError extends Error {
    constructor(statusCode = 500, message = "Internal Server Error") {
        super(message);
        this.name = "ExpressError";
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ExpressError;
