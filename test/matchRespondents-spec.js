const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));

const { RespondentMatcher } = require("../RespondentMatcher");
const projectParams = require("../data/project.json");
const { strictEqual } = require("assert");

let matcher;
let filePath = "./data/respondents_data_test.csv";

describe("RespondentMatcher()", () => {
    beforeEach(async () => {
        matcher = new RespondentMatcher(filePath, projectParams);
        await matcher.parseData();
        matcher.matchRespondentsToProjectParams();
    });

    describe("checks class constructor", () => {
        it("should return this.respondentsDataFilePath as filePatch", () => {
            let result = (() =>
                matcher.getRespondentsDataFilePath() === filePath)();

            let expected = true;

            assert.strictEqual(result, expected);
        });
        it("should return this.projectParams as projectParams", () => {
            let result = (() => {
                for (let key in matcher.projectParams) {
                    if (matcher.projectParams[key] !== projectParams[key]) {
                        return false;
                    }
                    return true;
                }
            })();

            let expected = true;

            assert.strictEqual(result, expected);
        });
    });

    describe("check that 8 results are returned", () => {
        it("should return array of length 8", () => {
            let result = matcher.returnTopEightResults().length;
            let expected = 8;

            assert.strictEqual(result, expected);
        });

        it("should return array with abdullah as top result", () => {
            expect(matcher.returnTopEightResults()[0].name).to.eql("abdullah");
        });

        it("should return array with neil as eighth result", () => {
            expect(matcher.returnTopEightResults()[7].name).to.eql("neal");
        });
    });
});
