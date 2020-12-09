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
    const parseLines = respondentsData.split("\n");

    // Map over array of entry lines
    // Split lines into entry with key(categories) value(information) pairs
    // Formats values to lower case
    parseLines.map((line) => {
        const entry = line.toLowerCase().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        console.log(entry);
    });
}

console.log(
    (async function () {
        await readData("./data/respondents_data_test.csv");
    })()
);
