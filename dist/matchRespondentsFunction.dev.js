"use strict";

var fs = require("fs").promises; // Load project params as JS object


var projectParams = require("./data/project.json");

function listOfMatchingRespondents(respondentsDataFilePath, projectParams) {
  var a, b, count;
  return regeneratorRuntime.async(function listOfMatchingRespondents$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (respondentsDataFilePath.endsWith(".csv")) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", "Invalid data filetype.");

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(readRespondentsData(respondentsDataFilePath));

        case 4:
          a = _context.sent;
          b = matchRespondents(a, projectParams);
          count = 0;
          b.forEach(function (item) {
            if (item.numberIndustriesMatch.numberOfMatches >= 2) {
              count++;
            }
          });
          return _context.abrupt("return", b);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}