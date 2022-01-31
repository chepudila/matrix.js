import { Exception } from "../Exception/Exception.js";

export class Animator {
    constructor(options, matrix) {
        if (options) {
            this.options = options;
            this.matrix = matrix;
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

    get matrix() {
        return this._matrix;
    }

    set matrix(value) {
        this._matrix = value;
    }

    get interval() {
        return this._interval;
    }

    set interval(value) {
        this._interval = value;
    }

    run() {
        this.interval = setInterval(() => {
            this.matrix.nextFrame();
        }, this.options.speed);
    }

    stop() {
        clearInterval(this.interval);
    }
}
