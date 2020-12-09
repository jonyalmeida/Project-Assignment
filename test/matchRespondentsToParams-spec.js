const assert = require("assert");

const matchRespondents = require("../utils/calculateDistance");

const location1 = { lat: 32.7766642, lon: -96.7969879 };
const location2 = { lat: 34.0522342, lon: -118.2436849 };
const location3 = { lat: 91, lon: 0 };
const location4 = { lat: 0, lon: -181 };

describe("distanceInKmBetweenEarthCoordinates()", () => {
    describe("checks for valid coordinates input", () => {
        it("should return 'latitude out of range' when latitude input is out of valid range", () => {
            let test = distanceInKmBetweenEarthCoordinates(
                location1,
                location3
            );
            let result = "Latitude out of range.";

            assert.strictEqual(test, result);
        });

        it("should return 'longitude out of range' when longitude input is out of valid range", () => {
            let test = distanceInKmBetweenEarthCoordinates(
                location1,
                location4
            );
            let result = "Longitude out of range.";

            assert.strictEqual(test, result);
        });
    });

    describe("checks distance calculation", () => {
        it("should calculate the earth distance between two coordinate locations", () => {
            let test = distanceInKmBetweenEarthCoordinates(
                location1,
                location2
            );
            let result = 1994.22;

            assert.strictEqual(test, result);
        });
    });
});

describe("degreesToRadians()", () => {
    describe("checks degrees to radians coversion", () => {
        it("should covert coordinate degress to radians", () => {
            let test = degreesToRadians(location1.lat);
            let result = 0.5720607081105532;

            assert.strictEqual(test, result);
        });
    });
});
