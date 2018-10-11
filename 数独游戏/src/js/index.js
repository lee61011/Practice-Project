function makeRow(v = 0){
    const array = new Array(9);
    array.fill(v);
    return array;
}

function makeMatrix(v = 0) {
    /*  这种做法有问题
        const array = new Array(9);
        array.fill(makeRow(v));
        return array;
    */

    /*return Array.from({length: 9})
        .map(() => makeRow(v));*/

    //  相对于上面的代码提高效率
    return Array.from({length: 9}, () => makeRow(v));
}


/**
*   Fisher-Yates    洗牌算法
* */
function shuffle(array) {
    const endIndex = array.length - 2;
    for (let i = 0; i < endIndex; i++) {
        const j = i + Math.floor(Math.random() * (array.length - i));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const a = Array.from({length: 9}, (v, i) => i);
console.log(a);
console.log(shuffle(a))