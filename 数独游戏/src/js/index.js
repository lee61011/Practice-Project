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

const a = makeMatrix();
a[0][1] = 2;
console.log(a);