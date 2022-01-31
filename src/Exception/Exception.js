export class Exception extends Error {
    constructor(message, name) {
        super(message);
        this.name = name ? name : "DefaultException";
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }
}
