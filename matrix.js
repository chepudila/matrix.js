import { Matrix } from "./src/Matrix/Matrix.js";

export const mtrx = {
    matrix: null,
    init: function (selector, options) {
        this.matrix = new Matrix(selector, options);
        return this;
    },
    run: function () {
        if (this.matrix) {
            this.matrix.runAnimation();
        }

        return this;
    },
};
