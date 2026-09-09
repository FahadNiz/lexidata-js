const { buildPath } = require("../query");

class RandomResource {
    constructor(client) {
        this.client = client;
    }

    async get(options = {}) {
        return this.client.request(
            buildPath("/random", options)
        );
    }
}

module.exports = {
    RandomResource
};