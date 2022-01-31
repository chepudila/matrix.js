import { Exception } from "../Exception/Exception.js";

export class MatrixCol {
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    constructor(options) {
        if (options) {
            this.options = options;
            this.colLength = this.getRandomLength();
            this.colStartAtRow = -this.colLength;
            this.mutateCol();
        } else {
            throw new Exception("Missing options");
        }
    }

    get options() {
        return this._options;
    }

    set options(value) {
        this._options = value;
    }

    get colLength() {
        return this._colLength;
    }

    set colLength(value) {
        this._colLength = value;
    }

    get colStartAtRow() {
        return this._colStartAtRow;
    }

    set colStartAtRow(value) {
        this._colStartAtRow = value;
    }

    get colString() {
        return this._colString;
    }

    set colString(value) {
        this._colString = value;
    }

    getRandomLength() {
        return (
            Math.floor(Math.random() * (this.options.maxLength - this.options.minLength + 1)) + this.options.minLength
        );
    }

    getRandomChar() {
        return this.characters.charAt(Math.floor(Math.random() * this.characters.length));
    }

    mutateCol() {
        let newColString = "";

        for (let index = 0; index < this.colLength; index++) {
            newColString += this.getRandomChar();
        }

        this.colString = newColString;
    }
}
