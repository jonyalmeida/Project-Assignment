// Calculate distance between two locations using geo coordinates
function distanceInKmBetweenEarthCoordinates(location1, location2) {
    let { lat: lat1, lon: lon1 } = location1;
    let { lat: lat2, lon: lon2 } = location2;

    // Check if locations have valid coordinates
    if (Math.abs(lat1) > 90 || Math.abs(lat2) > 90) {
        return "Latitude out of range.";
        // throw Error("Latitude out of range.");
    }
    if (Math.abs(lon1) > 180 || Math.abs(lon2) > 180) {
        return "Longitude out of range.";
        // throw Error("Longitude out of range.");
    }

    const earthRadiusInKm = 6378.137;

    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
            Math.sin(dLon / 2) *
            Math.cos(lat1) *
            Math.cos(lat2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Number((earthRadiusInKm * c).toFixed(2));
}

//Convert degress to radians
function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

module.exports = { distanceInKmBetweenEarthCoordinates, degreesToRadians };
