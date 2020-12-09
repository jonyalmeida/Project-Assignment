# Respondent Matcher

By Jony Almeida-

**Table of Contents**

-   [Respondent Matcher at a Glance](#matcher-at-a-glance)
-   [Application Architecture & Technologies Used](#application-architecture)
-   [Backend Overview](#backend-overview)
-   [Conclusion & Next Steps](#conclusion-and-next-steps)

## Respondent Matcher at a Glance

Respondent Matcher is Scoring Algorithm function that calculates a Respondent candidate's
matching score based on the candidate's information and the custom data points.

## Application Architecture

Respondent Matcher is designed as a stand alone algorithm that will take in respondents'
data in csv format and the project parameters for ideal matching, as arguments.

Built in Node.js, with Javascript and tested with Mocha Testing.

##### Matching Score Algorithm

```javascript
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
```

### Backend Technologies Used

#### ExpressJS

[Express](https://expressjs.com/) was the natural choice for a simple Node.js server.

#### Pug

[Pug](https://www.pug.org/) was perfect for creating a web visualization of the results.

**Next Steps:**
Next steps for Respondent Matcher include:

-   developing a UI with form for data input and option selection
-   connecting a database

Thanks for reading! ✌🏽
