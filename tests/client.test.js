const test = require("node:test");
const assert = require("node:assert/strict");

const {
    createClient,
    LexidataClient,
    LexidataError,
    DEFAULT_BASE_URL
} = require("../src");

test("uses the default Lexidata API URL", () => {
    const lexidata = createClient();

    assert.equal(
        lexidata.client.baseUrl,
        DEFAULT_BASE_URL
    );
});

test("creates a custom client", () => {
    const lexidata = createClient({
        baseUrl: "https://example.com/api/v1/"
    });

    assert.equal(
        lexidata.client.baseUrl,
        "https://example.com/api/v1"
    );
});

test("exports LexidataClient", () => {
    const lexidata = createClient();

    assert.ok(
        lexidata.client instanceof LexidataClient
    );
});

test("builds dataset URLs", async () => {
    const lexidata = createClient();

    const url = await lexidata.datasetUrl({
        format: "csv",
        fields: "meaning",
        startsWith: "comm"
    });

    assert.equal(
        url,
        "https://api.lexidata.dev/api/v1/dataset?format=csv&fields=meaning&startsWith=comm"
    );
});

test("builds dataset URLs with arrays", async () => {
    const lexidata = createClient();

    const url = await lexidata.datasetUrl({
        fields: [
            "word",
            "definitions"
        ],
        pos: [
            "noun",
            "verb"
        ]
    });

    assert.equal(
        url,
        "https://api.lexidata.dev/api/v1/dataset?format=json&fields=word&fields=definitions&pos=noun&pos=verb"
    );
});

test("builds JSON export URLs", async () => {
    const lexidata = createClient();

    const url = await lexidata.datasetUrl({
        format: "json",
        fields: "all"
    });

    assert.equal(
        url,
        "https://api.lexidata.dev/api/v1/dataset?format=json&fields=all"
    );
});

test("builds JSONL export URLs", async () => {
    const lexidata = createClient();

    const url = await lexidata.datasetUrl({
        format: "jsonl",
        fields: "meaning"
    });

    assert.equal(
        url,
        "https://api.lexidata.dev/api/v1/dataset?format=jsonl&fields=meaning"
    );
});

test("builds CSV export URLs", async () => {
    const lexidata = createClient();

    const url = await lexidata.datasetUrl({
        format: "csv",
        fields: "all"
    });

    assert.equal(
        url,
        "https://api.lexidata.dev/api/v1/dataset?format=csv&fields=all"
    );
});

test("builds TXT export URLs", async () => {
    const lexidata = createClient();

    const url = await lexidata.datasetUrl({
        format: "txt",
        fields: "word"
    });

    assert.equal(
        url,
        "https://api.lexidata.dev/api/v1/dataset?format=txt&fields=word"
    );
});

test("encodes dataset query parameters", async () => {
    const lexidata = createClient();

    const url = await lexidata.datasetUrl({
        format: "json",
        startsWith: "hello world"
    });

    assert.equal(
        url,
        "https://api.lexidata.dev/api/v1/dataset?format=json&startsWith=hello+world"
    );
});

test("rejects an empty word", async () => {
    const lexidata = createClient();

    await assert.rejects(
        () => lexidata.word(""),
        {
            name: "TypeError"
        }
    );
});

test("rejects whitespace-only words", async () => {
    const lexidata = createClient();

    await assert.rejects(
        () => lexidata.word("   "),
        {
            name: "TypeError"
        }
    );
});

test("accepts a valid word", async () => {
    const lexidata = createClient();

    const result = await lexidata.word("hello");

    assert.ok(result);
    assert.ok(result.data);
    assert.equal(
        result.data.word,
        "hello"
    );
});

test("accepts a string search query", async () => {
    const lexidata = createClient();

    const result =
        await lexidata.search("comm");

    assert.ok(result);
    assert.ok(result.data);
    assert.equal(
        result.data.query,
        "comm"
    );
});

test("accepts search options", async () => {
    const lexidata = createClient();

    const result =
        await lexidata.search({
            q: "comm",
            match: "prefix"
        });

    assert.ok(result);
    assert.ok(result.data);
    assert.equal(
        result.data.query,
        "comm"
    );
});

test("accepts random word options", async () => {
    const lexidata = createClient();

    const result =
        await lexidata.random({
            limit: 2
        });

    assert.ok(result);
    assert.ok(result.data);
    assert.equal(
        result.data.count,
        2
    );
});

test("retrieves dataset records", async () => {
    const lexidata = createClient();

    const result =
        await lexidata.dataset({
            limit: 2,
            fields: "meaning",
            startsWith: "comm"
        });

    assert.ok(result);
    assert.ok(result.data);
    assert.equal(
        result.data.length,
        2
    );

    assert.equal(
        result.data[0].word,
        "comma"
    );
});

test("exports LexidataError", () => {
    const error = new LexidataError(
        "Something went wrong",
        {
            code: "TEST_ERROR",
            status: 400
        }
    );

    assert.equal(
        error.name,
        "LexidataError"
    );

    assert.equal(
        error.code,
        "TEST_ERROR"
    );

    assert.equal(
        error.status,
        400
    );
});

test("stores error details", () => {
    const details = {
        field: "banana"
    };

    const error = new LexidataError(
        "Invalid field",
        {
            code: "INVALID_FIELD",
            status: 400,
            details
        }
    );

    assert.equal(
        error.code,
        "INVALID_FIELD"
    );

    assert.equal(
        error.status,
        400
    );

    assert.deepEqual(
        error.details,
        details
    );
});