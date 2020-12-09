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

    // Returns respondents data object
    return respondentsDataObject;
}

// Calculate distance using geo coordinates
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

    for (let respondent in respondentsDataObject) {
        const curRespondent = respondentsDataObject[respondent];

        // Initialize current respondent object
        const curRespondentOutput = {};

        //calculate respondent distance to available cities
        let closestCityDistance = Infinity;
        let distance = null;
        for (let city in projectParams.cities) {
            if (city === curRespondent.city) {
                curRespondentOutput.distanceToClosestAvailableCity = {
                    distance: 0,
                    city: city,
                };
                break;
            }
            const distance = distanceInKmBetweenEarthCoordinates(
                city.location.location.latitude,
                city.location.location.longitude
            );
            if (distance > 100) continue;

            if (distance < closestCityDistance) closestCityDistance = distance;
        }

        if (distance > 100) continue;

        // Check number of matches for industries
        const curRespondentMatchingIndustries = curRespondent.industry.filter(
            (industry) => projectParams.professionalIndustry.includes(industry)
        );
        curRespondentOutput.numberIndustriesMatch = {
            numberOfMatches: curRespondentMatchingIndustries.length,
            industryMatches: curRespondentMatchingIndustries,
        };

        // Check if job title match
        curRespondentOutput.jobMatches = {
            match: projectParams.professionalJobTitles.includes(
                curRespondent.jobTitle
            ),
            jobTitle: curRespondent.jobTitle,
        };

        matchResults.push(curRespondent);
    }
}

console.log(
    matchRespondents(
        {
            industry: [
                "Banking",
                "Financial Services",
                "123",
                "4341",
                "Computer Software",
            ],
            jobTitle: "dev",
        },
        {
            professionalIndustry: [
                "Banking",
                "Financial Services",
                "Government Administration",
                "Insurance",
                "Retail",
                "Supermarkets",
                "Automotive",
                "Computer Software",
            ],
            professionalJobTitles: ["de2v", "12", "21"],
        }
    )
);
