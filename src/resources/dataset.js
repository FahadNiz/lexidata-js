class DatasetResource {
    constructor(client) {
        this.client = client;
    }

    async get(options = {}) {
        const params = new URLSearchParams();

        for (const [key, value] of Object.entries(options)) {
            if (
                value === undefined ||
                value === null ||
                value === ""
            ) {
                continue;
            }

            if (Array.isArray(value)) {
                for (const item of value) {
                    params.append(key, String(item));
                }
            } else {
                params.append(key, String(value));
            }
        }

        const query = params.toString();

        return this.client.request(
            query
                ? `/dataset?${query}`
                : "/dataset"
        );
    }

    async export(options = {}) {
        const {
            format = "json",
            ...datasetOptions
        } = options;

        const url =
            await this.url({
                ...datasetOptions,
                format
            });

        return this.client.requestRaw(
            url.replace(
                this.client.baseUrl,
                ""
            ),
            {
                headers: {
                    Accept:
                        this.getAcceptHeader(format)
                }
            }
        );
    }

    async url(options = {}) {
        const {
            format = "json",
            ...datasetOptions
        } = options;

        const params = new URLSearchParams();

        params.append(
            "format",
            String(format)
        );

        for (
            const [key, value]
            of Object.entries(datasetOptions)
        ) {
            if (
                value === undefined ||
                value === null ||
                value === ""
            ) {
                continue;
            }

            if (Array.isArray(value)) {
                for (const item of value) {
                    params.append(
                        key,
                        String(item)
                    );
                }
            } else {
                params.append(
                    key,
                    String(value)
                );
            }
        }

        return `${this.client.baseUrl}/dataset?${params.toString()}`;
    }

    getAcceptHeader(format) {
        switch (
            String(format).toLowerCase()
        ) {
            case "json":
                return "application/json";

            case "jsonl":
                return "application/x-ndjson";

            case "csv":
                return "text/csv";

            case "txt":
                return "text/plain";

            default:
                return "*/*";
        }
    }
}

module.exports = {
    DatasetResource
};