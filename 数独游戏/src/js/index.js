const toolkit = require("./toolkit")

const matrix = toolkit.makeMatrix();
console.log(matrix);

class Grid {
    constructor(container) {
        this._$container = container;
    }

    build() {
        const matrix = toolkit.makeMatrix();

        const $cells = matrix.map(rowValues => rowValues.map(cellValue => {
            return $("<span>").text(cellValue);
        }));

        const $divArray = $cells.map($spanArray => {
            return $("<div>").append($spanArray);
        });

        this._$container.append($divArray);
    }
}

new Grid($("#container")).build();