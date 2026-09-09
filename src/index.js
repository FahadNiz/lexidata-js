const {
    LexidataClient,
    DEFAULT_BASE_URL
} = require("./client");

const {
    LexidataError
} = require("./errors");

const {
    WordsResource
} = require("./resources/words");

const {
    SearchResource
} = require("./resources/search");

const {
    RandomResource
} = require("./resources/random");

const {
    DatasetResource
} = require("./resources/dataset");

function createClient(options = {}) {
    const client =
        new LexidataClient(options);

    const words =
        new WordsResource(client);

    const search =
        new SearchResource(client);

    const random =
        new RandomResource(client);

    const dataset =
        new DatasetResource(client);

    return {
        word: word =>
            words.get(word),

        search: options =>
            search.search(options),

        random: options =>
            random.get(options),

        dataset: options =>
            dataset.get(options),

        export: options =>
            dataset.export(options),

        datasetUrl: options =>
            dataset.url(options),

        client
    };
}

const defaultClient =
    createClient();

module.exports = {
    createClient,
    LexidataClient,
    LexidataError,
    DEFAULT_BASE_URL,

    word: defaultClient.word,
    search: defaultClient.search,
    random: defaultClient.random,
    dataset: defaultClient.dataset,
    export: defaultClient.export,
    datasetUrl: defaultClient.datasetUrl
};