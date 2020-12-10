const assert = require("assert");

const RespondentMatcher = require("../RespondentMatcher");

const binaryInsert = require("../utils/sortingAlgorithm");

const elementsArray = (() => {
    const array = [];
    for (let i = 0; i < 100; i++) {
        array.push({ score: Math.floor(Math.random() * 100) });
    }
    return array;
})();

let results = [];
describe("binaryInsert()", () => {
    beforeEach(() => {
        elementsArray.forEach((item) => binaryInsert(item, results));
    });
