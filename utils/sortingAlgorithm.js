// function binaryAdd(array, respondent) {
//     function comp(a, b) {
//         return a.score > b.score;
//     }
//     console.log(respondent.score);
//     if (!array[0] || respondent.score < array[0].score) return 0;
//     if (respondent.score > array[array.length - 1].score) return array.length;
//     let x = 0;
//     let y = array.length - 1;
//     while (x <= y) {
//         const idx = (y + x) >> 1;
//         console.log(array[idx].score);
//         const compare = comp(respondent, array[idx]);
//         if (compare > 0) {
//             x = idx + 1;
//         } else if (compare < 0) {
//             y = idx - 1;
//         } else {
//             return idx;
//         }
//     }
//     return -x - 1;
// }

module.exports = binaryInsert;

function binaryInsert(element, array, startVal, endVal) {
    var length = array.length;
    var start = typeof startVal != "undefined" ? startVal : 0;
    var end = typeof endVal != "undefined" ? endVal : length - 1; //!! endVal could be 0 don't use || syntax
    var m = start + Math.floor((end - start) / 2);

    if (length == 0) {
        array.push(element);
        return;
    }

    if (element.score >= array[end].score) {
        array.splice(end + 1, 0, element);
        return;
    }

    if (element.score <= array[start].score) {
        //!!
        array.splice(start, 0, element);
        return;
    }

    if (element.score <= array[m].score) {
        binaryInsert(element, array, start, m - 1);
        return;
    }

    if (element.score >= array[m].score) {
        binaryInsert(element, array, m + 1, end);
        return;
    }

    //we don't insert duplicates
}
