function appendQueryParam(params, key, value) {
    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {
        return;
    }

    if (Array.isArray(value)) {
        for (const item of value) {
            appendQueryParam(params, key, item);
        }

        return;
    }

    params.append(key, String(value));
}

function buildQuery(options = {}) {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(options)) {
        appendQueryParam(params, key, value);
    }

    return params;
}

function buildPath(path, options = {}) {
    const query = buildQuery(options);
    const queryString = query.toString();

    if (!queryString) {
        return path;
    }

    return `${path}?${queryString}`;
}

module.exports = {
    appendQueryParam,
    buildQuery,
    buildPath
};