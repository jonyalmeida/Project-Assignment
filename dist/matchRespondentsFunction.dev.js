"use strict";

var fs = require("fs").promises; // Load project params as JS object


var projectParams = require("./data/project.json"); // Read Respondents' data from .csv file


function readRespondentsData(respondentsDataFilePath) {
  var respondentsData, parseLines;
  return regeneratorRuntime.async(function readRespondentsData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fs.readFile(respondentsDataFilePath, "utf8", function (err, data) {
            if (err) {
              return "Error reading file.\n".concat(err);
            }

            return data;
          }));

        case 2:
          respondentsData = _context.sent;
          // Parse data into organized usable data
          // Split data into lines as 1 entry === 1 line
          parseLines = respondentsData.split("\n").slice(1); // Map over array of entry lines
          // Split lines into entry with key(categories) value(information) pairs
          // Formats values to lower case
          // Stores organized data in respondentsDataObject using the line # index as keys

          respondentsDataObject = {};
          parseLines.map(function (line, idx) {
            if (line) {
              var entry = line.toLowerCase().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
              respondentsDataObject[idx] = {
                firstName: entry[0],
                gender: entry[1],
                jobTitle: entry[2],
                industry: function () {
                  return entry[3].slice(1, entry[3].length - 1).split(",");
                }(),
                city: function () {
                  return entry[4].slice(1, entry[4].length - 1).split(",")[0];
                }(),
                lat: Number(entry[5]),
                lon: Number(entry[6])
              };
            }
          }); // Returns respondents data object

          return _context.abrupt("return", respondentsDataObject);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
} // Calculate distance between two points using geo coordinates


function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
  function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  var earthRadiusKm = 6371;
  var dLat = degreesToRadians(lat2 - lat1);
  var dLon = degreesToRadians(lon2 - lon1);
  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
} // Match respondents with project params


function matchRespondents(respondentsDataObject, projectParams) {
  var matchResults = [];
  var curRespondent = {};

  for (var respondent in respondentsDataObject) {
    for (var key in respondentsDataObject[respondent]) {
      curRespondent[key] = respondentsDataObject[respondent][key];
    } // Initialize current respondent object


    var curRespondentOutput = {}; // Calculate respondent distance to available cities
    // Since only eliminating factor is distance > 100km
    // If closest distance to any available city > 100km continue to next respondent

    curRespondentOutput.distanceToClosestAvailableCity = {
      distance: Infinity,
      city: ""
    };
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = projectParams.cities[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var city = _step.value;
        var curDistance = null;

        if (city.location.city.toLowerCase() === curRespondent.city) {
          curRespondentOutput.distanceToClosestAvailableCity = {
            distance: 0,
            city: city.location.city
          };
          break;
        }

        curDistance = distanceInKmBetweenEarthCoordinates(city.location.location.latitude, city.location.location.longitude, curRespondent.lat, curRespondent.lon);

        if (curDistance > 100) {
          continue;
        }

        if (curDistance < curRespondentOutput.distanceToClosestAvailableCity.distance) {
          curRespondentOutput.distanceToClosestAvailableCity.distance = curDistance;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (curRespondentOutput.distanceToClosestAvailableCity.distance > 100) {
      continue;
    } // Check if job title match


    curRespondentOutput.jobMatches = {
      match: projectParams.professionalJobTitles.some(function (item) {
        return item.toLowerCase() === curRespondent.jobTitle;
      }),
      jobTitle: curRespondent.jobTitle
    };
    if (!curRespondentOutput.jobMatches.match) continue; // Check number of matches for industries

    var curRespondentMatchingIndustries = projectParams.professionalIndustry.filter(function (industry) {
      return curRespondent.industry.includes(industry.toLowerCase());
    });
    curRespondentOutput.numberIndustriesMatch = {
      numberOfMatches: curRespondentMatchingIndustries.length,
      industryMatches: curRespondentMatchingIndustries
    };
    if (!curRespondentOutput.numberIndustriesMatch.numberOfMatches) continue; // Adds respondent to results array

    matchResults.push(curRespondentOutput);
  }

  return matchResults;
}

function listOfMatchingRespondents(respondentsDataFilePath, projectParams) {
  var a, b;
  return regeneratorRuntime.async(function listOfMatchingRespondents$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(readRespondentsData(respondentsDataFilePath));

        case 2:
          a = _context2.sent;
          // console.log(a);
          b = matchRespondents(a, projectParams);
          console.log(b.length);
          b.forEach(function (item) {
            if (item.numberIndustriesMatch.numberOfMatches >= 2) {
              console.log(item);
            }
          });

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}

listOfMatchingRespondents("./data/respondents_data_test.csv", projectParams);