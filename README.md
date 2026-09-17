# Lexidata

<p align="center">
  <img
    src="./assets/branding/Lexidata-logo-primary.svg"
    alt="Lexidata"
    width="560"
  />
</p>

<p align="center">
  JavaScript client for the <a href="https://lexidata.dev">Lexidata</a> open lexical data API.
</p>

<p align="center">
  <a href="https://api.lexidata.dev">Production API</a>
  ·
  <a href="https://lexidata.dev">Website</a>
  ·
  <a href="https://github.com/FahadNiz/lexidata">GitHub</a>
</p>

Lexidata provides open lexical data for English words, including definitions, senses, examples, pronunciations, synsets, semantic relations, search, random words, and dataset exports.

## Installation

```bash
npm install lexidata
```

## Quick Start

```js
const lexidata = require("lexidata");

const result = await lexidata.word("hello");

console.log(result);
```

## Creating a Client

You can create a configured Lexidata client using `createClient()`.

```js
const { createClient } = require("lexidata");

const lexidata = createClient({
    baseUrl: "https://api.lexidata.dev/api/v1"
});

const result = await lexidata.word("hello");

console.log(result);
```

The default API URL is:

```text
https://api.lexidata.dev/api/v1
```

## Word Lookup

Look up a word and retrieve its lexical information.

```js
const result = await lexidata.word("language");

console.log(result);
```

The response can contain information such as:

- Word
- Part of speech
- Pronunciations
- Senses
- Synsets
- Definitions
- Examples
- Semantic relations

## Search

Search the Lexidata vocabulary.

```js
const result = await lexidata.search({
    q: "comm",
    match: "prefix"
});

console.log(result);
```

A search query can also be supplied as a string:

```js
const result = await lexidata.search("comm");

console.log(result);
```

## Random Words

Retrieve random words from the Lexidata dataset.

```js
const result = await lexidata.random({
    limit: 10
});

console.log(result);
```

Additional API-supported options can be passed through the options object.

```js
const result = await lexidata.random({
    limit: 20,
    pos: "noun"
});

console.log(result);
```

## Dataset

Retrieve structured dataset records from Lexidata.

```js
const result = await lexidata.dataset({
    limit: 100,
    fields: "meaning",
    startsWith: "comm"
});

console.log(result);
```

The dataset endpoint supports pagination and word filters.

```js
const result = await lexidata.dataset({
    limit: 100,
    page: 1,
    startsWith: "comm",
    pos: "noun"
});

console.log(result);
```

## Dataset Presets

Lexidata provides several dataset field presets.

### Basic

```js
const result = await lexidata.dataset({
    fields: "basic"
});
```

Includes:

```text
word
part_of_speech
```

### Meaning

```js
const result = await lexidata.dataset({
    fields: "meaning"
});
```

Includes:

```text
word
part_of_speech
definitions
examples
```

### Linguistic

```js
const result = await lexidata.dataset({
    fields: "linguistic"
});
```

Includes:

```text
word
part_of_speech
pronunciations
senses
synsets
```

### All

```js
const result = await lexidata.dataset({
    fields: "all"
});
```

Includes all available dataset fields.

## Dataset Fields

Individual fields can also be requested.

Available fields:

```text
word
part_of_speech
pronunciations
senses
synsets
definitions
examples
relations
```

For example:

```js
const result = await lexidata.dataset({
    fields: [
        "word",
        "definitions",
        "examples"
    ]
});

console.log(result);
```

The `word` field is always included by the API.

## Semantic Relations

The `relations` field contains semantic relationships between synsets.

```js
const result = await lexidata.dataset({
    fields: [
        "word",
        "definitions",
        "relations"
    ]
});

console.log(result);
```

Relations may include types such as:

```text
hypernym
hyponym
domain_topic
```

The available relation types depend on the underlying lexical data.

## Dataset Export

Lexidata supports dataset exports in multiple formats:

```text
JSON
JSONL
CSV
TXT
```

The npm client provides `lexidata.export()` for requesting these exports.

### JSON

```js
const response = await lexidata.export({
    format: "json",
    fields: "all"
});

const data = await response.json();

console.log(data);
```

### JSONL

```js
const response = await lexidata.export({
    format: "jsonl",
    fields: "meaning"
});

const text = await response.text();

console.log(text);
```

### CSV

```js
const response = await lexidata.export({
    format: "csv",
    fields: "meaning"
});

const csv = await response.text();

console.log(csv);
```

### TXT

```js
const response = await lexidata.export({
    format: "txt"
});

const text = await response.text();

console.log(text);
```

The returned object is a standard Fetch `Response`, allowing you to choose how you want to consume the exported data.

## Export With Filters

Export options can be combined with dataset filters.

```js
const response = await lexidata.export({
    format: "csv",
    fields: "meaning",
    startsWith: "comm",
    pos: "noun"
});

const csv = await response.text();

console.log(csv);
```

## Export All Fields

```js
const response = await lexidata.export({
    format: "jsonl",
    fields: "all"
});

const data = await response.text();

console.log(data);
```

## Dataset URLs

You can generate a dataset URL without making an API request.

```js
const url = await lexidata.datasetUrl({
    format: "csv",
    fields: "all"
});

console.log(url);
```

Example output:

```text
https://api.lexidata.dev/api/v1/dataset?format=csv&fields=all
```

This is useful when you want to:

- Open an export directly
- Provide an export link to a user
- Use the URL in another application
- Build your own download interface

## Combining Filters

Dataset options can be combined.

```js
const result = await lexidata.dataset({
    fields: "meaning",
    pos: "noun",
    startsWith: "comm",
    limit: 100,
    page: 1
});

console.log(result);
```

For example, you can request:

```text
Meaning fields
+
Nouns
+
Words beginning with "comm"
+
First page
+
100 records
```

## Arrays

Options that accept repeated query parameters can be passed as arrays.

```js
const result = await lexidata.dataset({
    fields: [
        "word",
        "definitions",
        "examples"
    ],
    pos: [
        "noun",
        "verb"
    ]
});

console.log(result);
```

## Error Handling

Lexidata API errors are represented by `LexidataError`.

```js
const {
    LexidataError
} = require("lexidata");

try {
    const result = await lexidata.word("example");

    console.log(result);
} catch (error) {
    if (error instanceof LexidataError) {
        console.error("Code:", error.code);
        console.error("Status:", error.status);
        console.error("Message:", error.message);
        console.error("Details:", error.details);
    } else {
        throw error;
    }
}
```

A `LexidataError` contains:

```text
name
code
status
details
message
```

## Custom API URL

You can provide a custom API base URL.

```js
const { createClient } = require("lexidata");

const lexidata = createClient({
    baseUrl: "https://example.com/api/v1"
});
```

The trailing slash is automatically removed.

## Custom Headers

Custom HTTP headers can be provided when creating a client.

```js
const { createClient } = require("lexidata");

const lexidata = createClient({
    headers: {
        "X-Custom-Header": "value"
    }
});
```

## API Key

The client supports API key configuration for authenticated Lexidata endpoints.

```js
const { createClient } = require("lexidata");

const lexidata = createClient({
    apiKey: "your-api-key"
});
```

The client sends the key using:

```text
Authorization: Bearer your-api-key
```

Authentication requirements depend on the Lexidata API endpoint being used.

## Complete Example

```js
const lexidata = require("lexidata");

async function main() {
    const word = await lexidata.word("language");

    console.log("WORD");
    console.log(word);

    const search = await lexidata.search({
        q: "comm",
        match: "prefix"
    });

    console.log("SEARCH");
    console.log(search);

    const random = await lexidata.random({
        limit: 5
    });

    console.log("RANDOM");
    console.log(random);

    const dataset = await lexidata.dataset({
        fields: "meaning",
        startsWith: "comm",
        limit: 10
    });

    console.log("DATASET");
    console.log(dataset);

    const response = await lexidata.export({
        format: "csv",
        fields: "meaning",
        startsWith: "comm"
    });

    const csv = await response.text();

    console.log("CSV EXPORT");
    console.log(csv);
}

main().catch(console.error);
```

## Browser Usage

The package uses the standard Fetch API.

Modern browsers provide `fetch` natively.

```js
import { createClient } from "lexidata";

const lexidata = createClient();

const result = await lexidata.word("world");

console.log(result);
```

For browser applications, make sure the Lexidata API endpoint is accessible from your application origin.

## Node.js

Lexidata supports modern Node.js versions with native `fetch`.

Node.js:

```text
18+
```

is required.

## CommonJS

```js
const lexidata = require("lexidata");

const result = await lexidata.word("world");
```

## Named Imports

```js
const {
    createClient,
    LexidataClient,
    LexidataError,
    DEFAULT_BASE_URL
} = require("lexidata");
```

## API Client Access

The underlying client is also available.

```js
const {
    createClient
} = require("lexidata");

const lexidata = createClient();

console.log(lexidata.client.baseUrl);
```

## Available Methods

The default client provides:

```text
word()
search()
random()
dataset()
export()
datasetUrl()
```

### `word(word)`

Look up a word.

```js
await lexidata.word("hello");
```

### `search(options)`

Search the API.

```js
await lexidata.search({
    q: "hello"
});
```

### `random(options)`

Retrieve random words.

```js
await lexidata.random({
    limit: 10
});
```

### `dataset(options)`

Retrieve dataset records.

```js
await lexidata.dataset({
    fields: "meaning",
    limit: 100
});
```

### `export(options)`

Request an export response.

```js
await lexidata.export({
    format: "csv",
    fields: "all"
});
```

### `datasetUrl(options)`

Generate a dataset URL.

```js
await lexidata.datasetUrl({
    format: "jsonl",
    fields: "meaning"
});
```

## Lexidata API

The npm package is a client for the public Lexidata REST API.

API:

https://api.lexidata.dev

Website:

https://lexidata.dev

Documentation:

https://lexidata.dev/docs

Dataset exports:

https://lexidata.dev/export

## Project

Lexidata is an open lexical data project designed to make English lexical information easy to access, query, export, and integrate into applications.

The project provides:

- REST API
- JavaScript client
- Search
- Word lookup
- Random words
- Dataset access
- Dataset exports
- Definitions
- Examples
- Pronunciations
- Synsets
- Semantic relations

## Development

Clone the repository:

```bash
git clone https://github.com/FahadNiz/lexidata-js.git
cd lexidata-js
```

Install dependencies:

```bash
npm install
```

Run tests:

```bash
npm test
```

Create an npm package:

```bash
npm pack
```

Preview what will be published:

```bash
npm publish --dry-run
```

## Repository

https://github.com/FahadNiz/lexidata-js

## License

This package's source code is licensed under the MIT License.

See the `LICENSE` file for the complete license text.

Lexidata's underlying lexical data may contain data derived from external sources. Data licensing and attribution requirements may therefore differ from the software license.

For applicable lexical-data attribution and licensing information, refer to the Lexidata project documentation.

## Lexidata

Words unlock worlds.