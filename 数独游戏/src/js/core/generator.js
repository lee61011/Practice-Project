/*   生成数独解决方案   */
const ToolKit = require("./toolkit")

class Generator {

    generate() {
        this.matrix = ToolKit.matrix.makeMatrix();

        for (let n = 1; n <= 9; n++) {
            this.fillNumber(n);
        }
    }

    fillNumber(n) {
        this.fillRow(n, 0);
    }

    fillRow(n, rowIndex) {
        if (rowIndex > 8) {
            return true;
        }

        const row = this.matrix[rowIndex];
        for (let i = 0; i < 9; i++) {
            const colIndex = i;
            if (row[colIndex]) {
                continue;
            }
        }

        //  当前行填写 n 成功, 递归调用 fillRow() 来在下一行中填写 n
        this.fillRow(n, rowIndex + 1);
    }
}