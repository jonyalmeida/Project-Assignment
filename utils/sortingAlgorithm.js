function binaryAdd(array, newElement) {
    function comp(a, b) {
        return a.score > b.score;
    }

    if (!array[0] || newElement.score < array[0].score) return 0;
    if (newElement.score > array[array.length - 1].score) return array.length;
    let x = 0;
    let y = array.length - 1;
    while (x <= y) {
        const idx = (y + x) >> 1;
        const compare = comp(newElement, array[idx]);
        if (compare > 0) {
            x = idx + 1;
        } else if (compare < 0) {
            y = idx - 1;
        } else {
            return idx;
        }
    }
    return -x - 1;
}

module.exports = binaryAdd;
