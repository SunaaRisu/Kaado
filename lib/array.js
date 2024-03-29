export function shuffle(array) {
    var currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}

export function arrayWithoutElementAtIndex(arr, index) {
    return arr.filter(function(value, arrIndex) {
        return index !== arrIndex;
    });
} 

export function randomizedArrayWithXElementsFromArray(arr, count) {
    arr = shuffle(arr);
    return arr.slice(0, count);
}