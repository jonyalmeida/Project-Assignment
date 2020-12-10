const assert = require("assert");
const fs = require("fs").promises;

const readRespondentsData = require("../utils/parseInputData");

const file = "./data/respondents_data_test.csv";

describe("readRespondentsData()", async () => {
    const parsedData = await readRespondentsData(file);
    const data = await fs.readFile(file, "utf8", (err, data) => {
        if (err) {
            return `Error reading file.\n${err}`;
        }
        return data;
    });

    describe("check number of entries in obj", () => {
        it("should return same number of entries as number of lines in input file - 1", async () => {
            let result = Object.keys(parsedData).length;
            let expected = data.split("\n").length - 1;

            assert.strictEqual(result, expected);
        });
    });

    describe("check that every entry in object has valid values", () => {
        it("should match every name", () => {
            let result = (() =>
                Object.keys(parsedData).every((item) =>
                    Object.keys(item).every((item) => item)
                ))();
            let expected = true;

            assert.strictEqual(result, expected);
        });
    });
});
