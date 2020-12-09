function binaryAdd(array, newElement) {
    function comp(a, b) {
        return a.score > b.score;
    }

    if (!array[0] || newElement.score < array[0].score) return 0;
    if (newElement.score > array[array.length - 1].score) return array.length;
    var m = 0;
    var n = array.length - 1;
    while (m <= n) {
        var k = (n + m) >> 1;
        var cmp = comp(newElement, array[k]);
        if (cmp > 0) {
            m = k + 1;
        } else if (cmp < 0) {
            n = k - 1;
        } else {
            return k;
        }
    }
    return -m - 1;
}

module.exports = binaryAdd;
