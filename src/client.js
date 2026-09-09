const { LexidataError } = require("./errors");

const DEFAULT_BASE_URL = "https://api.lexidata.dev/api/v1";

class LexidataClient {
    constructor(options = {}) {
        this.baseUrl = (
            options.baseUrl ||
            DEFAULT_BASE_URL
        ).replace(/\/+$/, "");

        this.apiKey = options.apiKey || null;

        this.headers = {
            Accept: "application/json",
            ...(options.headers || {})
        };

        if (this.apiKey) {
            this.headers.Authorization =
                `Bearer ${this.apiKey}`;
        }
    }

    async request(path, options = {}) {
        const {
            method = "GET",
            headers = {},
            ...fetchOptions
        } = options;

        const response = await fetch(
            `${this.baseUrl}${path}`,
            {
                method,
                headers: {
                    ...this.headers,
                    ...headers
                },
                ...fetchOptions
            }
        );

        const contentType =
            response.headers.get("content-type") || "";

        let body = null;

        if (contentType.includes("application/json")) {
            body = await response.json();
        } else {
            body = await response.text();
        }

        if (!response.ok) {
            const errorData =
                body &&
                typeof body === "object" &&
                body.error
                    ? body.error
                    : {};

            throw new LexidataError(
                errorData.message ||
                `Lexidata API request failed with status ${response.status}.`,
                {
                    code:
                        errorData.code ||
                        "API_ERROR",
                    status: response.status,
                    details: body
                }
            );
        }

        return body;
    }

    async requestRaw(path, options = {}) {
        const {
            method = "GET",
            headers = {},
            ...fetchOptions
        } = options;

        const response = await fetch(
            `${this.baseUrl}${path}`,
            {
                method,
                headers: {
                    ...this.headers,
                    ...headers
                },
                ...fetchOptions
            }
        );

        if (!response.ok) {
            let details = null;

            try {
                details = await response.json();
            } catch {
                details = await response.text();
            }

            const errorData =
                details &&
                typeof details === "object" &&
                details.error
                    ? details.error
                    : {};

            throw new LexidataError(
                errorData.message ||
                `Lexidata API request failed with status ${response.status}.`,
                {
                    code:
                        errorData.code ||
                        "API_ERROR",
                    status: response.status,
                    details
                }
            );
        }

        return response;
    }
}

module.exports = {
    LexidataClient,
    DEFAULT_BASE_URL
};