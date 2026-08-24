# Lexidata

A lightweight JavaScript client for the [Lexidata](https://lexidata.dev) English lexical data API.

Lexidata provides developers with access to English words, definitions, examples, pronunciations, parts of speech, WordNet senses, search, filtering, and random word generation through a simple REST API.

The npm package provides a convenient JavaScript interface for interacting with the hosted Lexidata API.

## Installation

```bash
npm install lexidata
```

## Quick Start

```javascript
const { createClient } = require("lexidata");

const lexidata = createClient();

const result = await lexidata.word("communicate");

console.log(result.data);
```

Example response:

```json
{
  "word": "communicate",
  "pronunciations": [
    "kəˈmjuːnɪkeɪt"
  ],
  "senses": [
    {
      "partOfSpeech": "verb",
      "synset": "00742582-v",
      "definition": "transmit thoughts or feelings",
      "examples": [
        "He communicated his anxieties to the psychiatrist"
      ]
    }
  ]
}
```

## API Client

Create a client using the default Lexidata API:

```javascript
const { createClient } = require("lexidata");

const lexidata = createClient();
```

The client uses:

```text
https://api.lexidata.dev
```

by default.

A custom API base URL can also be supplied:

```javascript
const lexidata = createClient({
  baseUrl: "http://localhost:3000"
});
```

This is useful when developing against a local Lexidata API server.

---

## Word Lookup

Look up a word and retrieve its lexical information.

```javascript
const result = await lexidata.word("communicate");

console.log(result.data);
```

The returned data may contain:

- Word
- Pronunciations
- Parts of speech
- Definitions
- Examples
- WordNet synset identifiers
- Multiple senses

Word lookup is case-insensitive:

```javascript
const result = await lexidata.word("COMMUNICATE");

console.log(result.data.word);
// communicate
```

---

## Search

Search the Lexidata vocabulary using different matching modes and filters.

```javascript
const result = await lexidata.search({
  q: "computer"
});

console.log(result.data);
```

### Exact Search

```javascript
const result = await lexidata.search({
  q: "computer",
  match: "exact"
});
```

Example:

```json
{
  "query": "computer",
  "results": [
    "computer"
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "totalPages": 1
  }
}
```

### Prefix Search

```javascript
const result = await lexidata.search({
  q: "comp",
  match: "prefix"
});
```

### Contains Search

```javascript
const result = await lexidata.search({
  q: "puter",
  match: "contains"
});
```

### Pagination

Search results can be paginated:

```javascript
const result = await lexidata.search({
  q: "comp",
  match: "prefix",
  page: 2,
  limit: 20
});
```

### Search Filters

Search supports lexical filters such as:

```javascript
const result = await lexidata.search({
  q: "pre",
  match: "prefix",
  partOfSpeech: "noun",
  minLength: 5,
  maxLength: 10
});
```

Available filters include:

| Filter | Description |
|---|---|
| `partOfSpeech` | Filter by part of speech |
| `minLength` | Minimum word length |
| `maxLength` | Maximum word length |
| `startsWith` | Filter by starting characters |
| `endsWith` | Filter by ending characters |
| `contains` | Filter by contained text |

---

## Random Words

Generate random words from the Lexidata dataset.

```javascript
const result = await lexidata.random({
  limit: 5
});

console.log(result.data.words);
```

Example:

```json
{
  "words": [
    "Allied Command Atlantic",
    "hanuman",
    "service book",
    "passbook savings account",
    "Centropus"
  ],
  "count": 5
}
```

### Random Words by Part of Speech

```javascript
const result = await lexidata.random({
  limit: 10,
  partOfSpeech: "noun"
});
```

### Random Word Filters

Random word generation supports the same filtering system:

```javascript
const result = await lexidata.random({
  limit: 10,
  partOfSpeech: "verb",
  minLength: 5,
  maxLength: 12
});
```

Available filters include:

- `partOfSpeech`
- `minLength`
- `maxLength`
- `startsWith`
- `endsWith`
- `contains`

---

## Error Handling

The client throws an error when the Lexidata API returns a non-successful HTTP status.

```javascript
try {
  const result = await lexidata.word("notarealword");
} catch (error) {
  console.error(error.message);
  console.error(error.status);
}
```

For example, an unknown word produces an HTTP `404` error.

The error object includes the HTTP status:

```javascript
try {
  await lexidata.word("notarealword");
} catch (error) {
  console.log(error.status);
  // 404
}
```

---

## API Methods

The client currently provides three primary methods.

### `word(word)`

Look up a word.

```javascript
await lexidata.word("hello");
```

### `search(options)`

Search the lexical dataset.

```javascript
await lexidata.search({
  q: "comp",
  match: "prefix",
  limit: 20
});
```

### `random(options)`

Generate random words.

```javascript
await lexidata.random({
  limit: 10,
  partOfSpeech: "noun"
});
```

---

## Using the REST API Directly

The npm package is a client for the public Lexidata REST API.

You can also access the API directly without installing the package.

### Word Lookup

```text
GET https://api.lexidata.dev/api/v1/words/:word
```

Example:

```text
https://api.lexidata.dev/api/v1/words/communicate
```

### Search

```text
GET https://api.lexidata.dev/api/v1/search
```

Example:

```text
https://api.lexidata.dev/api/v1/search?q=computer&match=exact
```

### Random Words

```text
GET https://api.lexidata.dev/api/v1/random
```

Example:

```text
https://api.lexidata.dev/api/v1/random?limit=5
```

For complete API information and interactive usage, visit:

**[Lexidata](https://lexidata.dev)**

---

## Requirements

- Node.js 18 or newer
- Internet access to the Lexidata API

The package has no runtime dependencies.

It uses the built-in `fetch()` API available in modern Node.js versions.

---

## About Lexidata

Lexidata is an open lexical data project built around English lexical information derived from Princeton WordNet.

The project provides:

- Word lookup
- Definitions
- Examples
- Pronunciations
- Parts of speech
- WordNet senses
- Synset identifiers
- Prefix search
- Exact search
- Contains search
- Pagination
- Random word generation
- Part-of-speech filtering
- Word-length filtering
- Prefix, suffix, and contains filtering

The Lexidata API is backed by PostgreSQL and is designed for applications involving dictionaries, NLP, education, word games, language tools, and other lexical-data use cases.

---

## Links

- Website: https://lexidata.dev
- API: https://api.lexidata.dev
- GitHub: https://github.com/FahadNiz/lexidata
- npm: https://www.npmjs.com/package/lexidata

---

## Data Attribution

Lexidata uses data derived from Princeton WordNet.

WordNet is developed by Princeton University.

WordNet 3.0:

> Copyright 2006 by Princeton University. All rights reserved.

For licensing and attribution information, see:

https://wordnet.princeton.edu/license-and-commercial-use

For information about citing WordNet:

https://wordnet.princeton.edu/citing-wordnet

Lexidata does not claim ownership of the original WordNet database or its contents.

---

## License

The Lexidata JavaScript client is released under the MIT License.

See [LICENSE](LICENSE) for the full license text.