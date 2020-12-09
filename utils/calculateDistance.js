// Calculate distance between two locations using geo coordinates
function distanceInKmBetweenEarthCoordinates(location1, location2) {
    let { lat1, lon1 } = location1;
    let { lat2, lon2 } = location2;

    //Convert degress to radians
    function degreesToRadians(degrees) {
        return (degrees * Math.PI) / 180;
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

    return (earthRadiusInKm * c).toFixed(2);
}

module.exports = distanceInKmBetweenEarthCoordinates;
