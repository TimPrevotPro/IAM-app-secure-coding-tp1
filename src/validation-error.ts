export class ValidationError extends Error {

    private target: string;
    private property: string;

    constructor(msg: string, target: string, property: string) {
        super(msg);
        this.target = target;
        this.property = property;

        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
