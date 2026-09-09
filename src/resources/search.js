const { buildPath } = require("../query");

class SearchResource {
    constructor(client) {
        this.client = client;
    }

    async search(options = {}) {
        if (
            typeof options === "string"
        ) {
            options = {
                q: options
            };
        }

        return this.client.request(
            buildPath("/search", options)
        );
    }
}

module.exports = {
    SearchResource
};