export default class AppError extends Error {
    constructor(message: string){
        super(message);
    }
}

export class InvalidArgumentError extends AppError {
    constructor(option: string, argument: string){
        super(`'${argument}' is not a valid argument for option '${option}'`);
    }
}