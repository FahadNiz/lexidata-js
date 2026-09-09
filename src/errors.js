class LexidataError extends Error {
    constructor(message, options = {}) {
        super(message);

        this.name = "LexidataError";
        this.code = options.code || "LEXIDATA_ERROR";
        this.status = options.status || null;
        this.details = options.details || null;
    }
}

module.exports = {
    LexidataError
};