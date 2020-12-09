// Matching score algorithm
function matchScore(industryList, respondent) {
    // Calculate percentage of matching industries
    const industryMatchScore = (() =>
        (100 * respondent.industriesMatch.number) / industryList)();

    // Calculate percentage of distance considering max distance
    const distanceMatchScore = (() =>
        100 - respondent.closestAvailableCity.distance)();

    // Calculate percentage of job match
    const jobMatchScore = (() => (respondent.jobMatches.match ? 100 : 0))();

    // Calculate final score
    const score =
        ((industryMatchScore + distanceMatchScore + jobMatchScore) * 100) / 300;

    return score;
}

module.exports = matchScore;
