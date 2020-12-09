const distanceInKmBetweenEarthCoordinates = require("./calculateDistance");
const matchScore = require("./matchScore");

// Match respondents with project params
function matchRespondents(respondentsDataObject, projectParams) {
    const matchResults = [];

    for (let respondent in respondentsDataObject) {
        const curRespondent = {};

        for (let key in respondentsDataObject[respondent]) {
            curRespondent[key] = respondentsDataObject[respondent][key];
        }

        // Initialize current respondent output object
        const curRespondentOutput = { name: curRespondent.firstName };

        // Calculate respondent distance to available cities
        // Since only eliminating factor is distance > 100km
        // If closest distance to any available city > 100km continue to next respondent
        curRespondentOutput.closestAvailableCity = {
            distance: Infinity,
            city: "",
        };
        for (let city of projectParams.cities) {
            let curDistance = null;
            // if (city.location.city.toLowerCase() === curRespondent.city) {
            //     curRespondentOutput.closestAvailableCity = {
            //         distance: 0,
            //         city: city.location.city,
            //     };
            //     break;
            // }
            curDistance = distanceInKmBetweenEarthCoordinates(
                {
                    lat1: city.location.location.latitude,
                    lon1: city.location.location.longitude,
                },
                { lat2: curRespondent.lat, lon2: curRespondent.lon }
            );

            if (curDistance > 100) {
                continue;
            }
            if (
                curDistance < curRespondentOutput.closestAvailableCity.distance
            ) {
                curRespondentOutput.closestAvailableCity.distance = Number(
                    curDistance
                );
                curRespondentOutput.closestAvailableCity.city =
                    city.location.city;
            }
        }

        // Only constraining factor
        if (curRespondentOutput.closestAvailableCity.distance > 100) {
            continue;
        }

        // Check if job title match
        curRespondentOutput.jobMatches = {
            match: projectParams.professionalJobTitles.some(
                (item) => item.toLowerCase() === curRespondent.jobTitle
            ),
            jobTitle: curRespondent.jobTitle,
        };
        // if (!curRespondentOutput.jobMatches.match) continue;

        // Check number of matches for industries
        const curRespondentMatchingIndustries = projectParams.professionalIndustry.filter(
            (industry) =>
                curRespondent.industry.includes(industry.toLowerCase())
        );
        curRespondentOutput.industriesMatch = {
            number: curRespondentMatchingIndustries.length,
            industries: curRespondentMatchingIndustries,
        };
        // if (!curRespondentOutput.numberIndustriesMatch.numberOfMatches)
        //     continue;

        // Calculate matching score
        curRespondentOutput.score = matchScore(
            projectParams.professionalIndustry.length,
            curRespondentOutput
        );

        // Adds respondent to results array
        matchResults.push(curRespondentOutput);
    }

    return matchResults;
}

module.exports = matchRespondents;
