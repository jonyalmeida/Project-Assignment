const fs = require("fs").promises;

// Load project params as JS object
const projectParams = require("./data/project.json");

// Read Respondents' data from .csv file
async function readRespondentsData(respondentsDataFilePath) {
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
    // Split data into lines as 1 entry per line
    const parseLines = respondentsData.split("\n").slice(1);

    // Initialize respondents' data object
    respondentsDataObject = {};

    // Map over array of entry lines
    parseLines.map((line, idx) => {
        if (line) {
            const entry = line
                // Formats values to lower case
                .toLowerCase()
                .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

            // Split lines into entry with key(categories) value(information) pairs
            // Stores organized data in respondentsDataObject using the line number index as keys
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

    // Returns respondents data object
    return respondentsDataObject;
}

// Calculate distance between two points using geo coordinates
function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    function degreesToRadians(degrees) {
        return (degrees * Math.PI) / 180;
    }

    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2 - lat1);
    var dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
            Math.sin(dLon / 2) *
            Math.cos(lat1) *
            Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
}

// Match respondents with project params
function matchRespondents(respondentsDataObject, projectParams) {
    const matchResults = [];

    let curRespondent = {};
    for (let respondent in respondentsDataObject) {
        for (let key in respondentsDataObject[respondent]) {
            curRespondent[key] = respondentsDataObject[respondent][key];
        }

        // Initialize current respondent object
        const curRespondentOutput = {};

        // Calculate respondent distance to available cities
        // Since only eliminating factor is distance > 100km
        // If closest distance to any available city > 100km continue to next respondent
        curRespondentOutput.distanceToClosestAvailableCity = {
            distance: Infinity,
            city: "",
        };
        for (let city of projectParams.cities) {
            let curDistance = null;
            if (city.location.city.toLowerCase() === curRespondent.city) {
                curRespondentOutput.distanceToClosestAvailableCity = {
                    distance: 0,
                    city: city.location.city,
                };
                break;
            }
            curDistance = distanceInKmBetweenEarthCoordinates(
                city.location.location.latitude,
                city.location.location.longitude,
                curRespondent.lat,
                curRespondent.lon
            );

            if (curDistance > 100) {
                continue;
            }
            if (
                curDistance <
                curRespondentOutput.distanceToClosestAvailableCity.distance
            ) {
                curRespondentOutput.distanceToClosestAvailableCity.distance = curDistance;
            }
        }

        if (curRespondentOutput.distanceToClosestAvailableCity.distance > 100) {
            continue;
        }

        // Check if job title match
        curRespondentOutput.jobMatches = {
            match: projectParams.professionalJobTitles.some(
                (item) => item.toLowerCase() === curRespondent.jobTitle
            ),
            jobTitle: curRespondent.jobTitle,
        };
        if (!curRespondentOutput.jobMatches.match) continue;

        // Check number of matches for industries
        const curRespondentMatchingIndustries = projectParams.professionalIndustry.filter(
            (industry) =>
                curRespondent.industry.includes(industry.toLowerCase())
        );
        curRespondentOutput.numberIndustriesMatch = {
            numberOfMatches: curRespondentMatchingIndustries.length,
            industryMatches: curRespondentMatchingIndustries,
        };
        if (!curRespondentOutput.numberIndustriesMatch.numberOfMatches)
            continue;

        // Adds respondent to results array
        matchResults.push(curRespondentOutput);
    }

    return matchResults;
}

async function listOfMatchingRespondents(
    respondentsDataFilePath,
    projectParams
) {
    // Check file is .csv
    if (!respondentsDataFilePath.endsWith(".csv")) {
        return "Invalid data filetype.";
    }

    const a = await readRespondentsData(respondentsDataFilePath);
    // console.log(a);

    const b = matchRespondents(a, projectParams);
    console.log(b.length);
    let count = 0;
    b.forEach((item) => {
        if (item.numberIndustriesMatch.numberOfMatches >= 2) {
            count++;
            console.log(item, count);
        }
    });
}

console.log(
    listOfMatchingRespondents("./data/respondents_data_test.txt", projectParams)
);
