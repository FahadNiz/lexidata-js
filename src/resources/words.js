const { buildPath } = require("../query");

class WordsResource {
    constructor(client) {
        this.client = client;
    }

    async get(word) {
        if (
            typeof word !== "string" ||
            word.trim() === ""
        ) {
            throw new TypeError(
                "word must be a non-empty string."
            );
        }

        return this.client.request(
            `/words/${encodeURIComponent(word.trim())}`
        );
    }
}

module.exports = {
    WordsResource
};