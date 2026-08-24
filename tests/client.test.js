const test = require("node:test");
const assert = require("node:assert/strict");

const {
    LexidataClient,
    createClient
} = require("../src");

const client = createClient();

test("creates a Lexidata client", () => {
    assert.ok(client instanceof LexidataClient);
});

test("looks up a word", async () => {
    const result = await client.word("communicate");

    assert.equal(result.data.word, "communicate");
    assert.ok(Array.isArray(result.data.pronunciations));
    assert.ok(result.data.pronunciations.includes("kəˈmjuːnɪkeɪt"));
    assert.ok(Array.isArray(result.data.senses));
});

test("word lookup is case-insensitive", async () => {
    const result = await client.word("COMMUNICATE");

    assert.equal(result.data.word, "communicate");
});

test("unknown word returns an API error", async () => {
    await assert.rejects(
        () => client.word("thisworddefinitelydoesnotexist"),
        error => {
            assert.equal(error.status, 404);
            return true;
        }
    );
});

test("search works", async () => {
    const result = await client.search({
        q: "computer",
        match: "exact"
    });

    assert.equal(result.data.query, "computer");
    assert.deepEqual(result.data.results, ["computer"]);
    assert.equal(result.data.pagination.total, 1);
});

test("random words works", async () => {
    const result = await client.random({
        limit: 5
    });

    assert.equal(result.data.count, 5);
    assert.equal(result.data.words.length, 5);
});