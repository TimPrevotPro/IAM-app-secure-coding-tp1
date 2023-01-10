export class ValidationError extends Error {

    private target: any;
    private property: string;

    constructor(msg: string, target: any, property: string) {
        super(msg);
        this.target = target;
        this.property = property;

        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
