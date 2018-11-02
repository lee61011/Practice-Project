/*   检查数据解决方案   */

function checkArray( array ) {
    const length = array.length;
    const marks = new Array(length);
    marks.fill(true);

    for (let i = 0; i < length - 1; i++) {
        if ( !marks[i] ) {
            continue;
        }

        const v = array[i];
        //  是否有效, 0 -- 无效,  1-9 -- 有效
        if ( !v ) {
            marks[i] = false;
            continue;
        }

        //  是否有重复: i+1 ~ 9, 是否和 i 位置的数据重复
        for (let j = i+1; j < length; j++) {
            if (v === array[j]) {
                marks[i] = marks[j] = false;
            }
        }
    }

    return marks;
}