// Load project params as JS object
const projectParams = require("./data/project.json");

const readRespondentsData = require("./utils/parseInputDataFunc");
const matchRespondents = require("./utils/matchRespondentsToParams");

async function listOfMatchingRespondents(
    respondentsDataFilePath,
    projectParams
) {
    // Check file is .csv
    if (!respondentsDataFilePath.endsWith(".csv")) {
        return "Invalid data filetype.";
    }

    const parsedData = await readRespondentsData(respondentsDataFilePath);

    const b = matchRespondents(parsedData, projectParams);

    for (let i = 0; i < 8; i++) {
        console.log(b[b.length - 1 - i]);
    }
}

console.log(
    listOfMatchingRespondents("./data/respondents_data_test.csv", projectParams)
);
