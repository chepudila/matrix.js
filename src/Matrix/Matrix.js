import { Exception } from "../Exception/Exception.js";
import { MatrixCol } from "../MatrixCol/MatrixCol.js";
import { Animator } from "../Animator/Animator.js";

export class Matrix {
    constructor(selector, options) {
        if (selector) {
            this.matrixArea = this.getAreaElement(selector);
        } else {
            throw new Exception("Missing selector");
        }

        if (options) {
            this.options = options;
        } else {
            this.options = {
                fontSize: "32px",
                speed: 60,
                minLength: 0,
                maxLength: 10,
                chance: 0.1,
            };
        }

        this.resizeMatrix();
        this.init();
    }

    get options() {
        return this._options;
    }

    set options(value) {
        this._options = value;
    }

    get matrixArea() {
        return this._matrixArea;
    }

    set matrixArea(value) {
        this._matrixArea = value;
    }

    get matrixCols() {
        return this._matrixCols;
    }

    set matrixCols(value) {
        this._matrixCols = value;
    }

    get matrixAnimator() {
        return this._matrixAnimator;
    }

    set matrixAnimator(value) {
        this._matrixAnimator = value;
    }

    get matrixColsCount() {
        return this._matrixColsCount;
    }

    set matrixColsCount(value) {
        this._matrixColsCount = value;
    }

    get matrixRowsCount() {
        return this._matrixRowsCount;
    }

    set matrixRowsCount(value) {
        this._matrixRowsCount = value;
    }

    getAreaElement(selector) {
        if (selector.startsWith(".")) {
            return this.getAreaElementByClass(selector)[0];
        }
    }

    getAreaElementByClass(selector) {
        return document.getElementsByClassName(selector.slice(1));
    }

    mutateCols() {
        this.matrixCols.forEach((col) => {
            if (col) {
                col.mutateCol();
                col.colStartAtRow++;
            }
        });
    }

    init() {
        this.matrixArea.style.fontSize = this.options.fontSize;
        this.matrixCols = Array.from({ length: this.matrixColsCount }, () => null);
        this.resizeMatrix();
    }

    nextFrame() {
        this.mutateCols();
        this.drawMatrix();
    }

    drawMatrix() {
        let matrixBody = document.createElement("div");
        matrixBody.classList.add("matrix-body");

        this.matrixCols.forEach((col, index) => {
            let colElement = document.createElement("div");
            colElement.classList.add("matrix-col");
            colElement.style.width = this.options.fontSize;

            if (col && col.colStartAtRow < this.matrixRowsCount) {
                colElement.style.marginTop = parseInt(this.options.fontSize, 10) * col.colStartAtRow + "px";

                for (var i = 0; i < col.colString.length; i++) {
                    let charElement = document.createElement("span");
                    charElement.innerText = col.colString.charAt(i);
                    colElement.appendChild(charElement);
                }
            } else {
                if (this.options.chance >= Math.random()) {
                    this.matrixCols[index] = new MatrixCol(this.options);
                }
            }

            matrixBody.appendChild(colElement);
        });

        this.matrixArea.innerHTML = "";
        this.matrixArea.appendChild(matrixBody);
    }

    runAnimation() {
        this.matrixAnimator = new Animator(this.options, this);
        this.matrixAnimator.run();
    }

    stopAnimation() {
        this.matrixAnimator.stop();
    }

    resizeMatrix() {
        this.matrixColsCount = Math.floor(this.matrixArea.offsetWidth / parseInt(this.options.fontSize, 10));
        this.matrixRowsCount = Math.floor(this.matrixArea.offsetHeight / parseInt(this.options.fontSize, 10));
    }
}
