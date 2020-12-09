const fs = require("fs").promises;

// Read Respondents' data from .csv file
async function readData(respondentsDataFilePath) {
    const respondentsData = await fs.readFile(
        respondentsDataFilePath,
        "utf8",
        (err, data) => {
            if (err) {
                return `Error reading file.\n${err}`;
            }
            return data;
        }
    );

    // Parse data into organized usable data
    // Split data into lines as 1 entry === 1 line
    const parseLines = respondentsData.split("\n").slice(1);

    // Map over array of entry lines
    // Split lines into entry with key(categories) value(information) pairs
    // Formats values to lower case
    // Stores organized data in respondentsDataObject using the line # index as keys
    respondentsDataObject = {};

    parseLines.map((line, idx) => {
        if (line) {
            const entry = line
                .toLowerCase()
                .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

            respondentsDataObject[idx] = {
                firstName: entry[0],
                gender: entry[1],
                jobTitle: entry[2],
                industry: (() =>
                    entry[3].slice(1, entry[3].length - 1).split(","))(),
                city: (() =>
                    entry[4].slice(1, entry[4].length - 1).split(",")[0])(),
                lat: Number(entry[5]),
                lon: Number(entry[6]),
            };
        }
    });

    console.log(respondentsDataObject);
}

console.log(
    (async function () {
        await readData("./data/respondents_data_test.csv");
    })()
);
