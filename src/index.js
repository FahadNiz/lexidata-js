const DEFAULT_BASE_URL = "https://api.lexidata.dev";

class LexidataClient {
    constructor(options = {}) {
        this.baseUrl = (options.baseUrl || DEFAULT_BASE_URL).replace(/\/+$/, "");
    }

    async request(path) {
        const response = await fetch(`${this.baseUrl}${path}`);

        let data;

        try {
            data = await response.json();
        } catch {
            throw new Error(`Lexidata API returned invalid JSON (${response.status})`);
        }

        if (!response.ok) {
            const message =
                data?.error?.message ||
                data?.message ||
                `Lexidata API request failed (${response.status})`;

            const error = new Error(message);
            error.status = response.status;
            error.response = data;

            throw error;
        }

        return data;
    }

    async word(word) {
        if (!word || typeof word !== "string") {
            throw new TypeError("word must be a non-empty string");
        }

        return this.request(
            `/api/v1/words/${encodeURIComponent(word)}`
        );
    }

    async search(options = {}) {
        const params = new URLSearchParams();

        for (const [key, value] of Object.entries(options)) {
            if (value !== undefined && value !== null) {
                params.set(key, String(value));
            }
        }

        return this.request(
            `/api/v1/search?${params.toString()}`
        );
    }

    async random(options = {}) {
        const params = new URLSearchParams();

        for (const [key, value] of Object.entries(options)) {
            if (value !== undefined && value !== null) {
                params.set(key, String(value));
            }
        }

        const query = params.toString();

        return this.request(
            `/api/v1/random${query ? `?${query}` : ""}`
        );
    }
}

function createClient(options) {
    return new LexidataClient(options);
}

module.exports = {
    LexidataClient,
    createClient
};