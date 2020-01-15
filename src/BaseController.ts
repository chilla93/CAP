import AppError from "./Models/AppError";

export default class BaseController {
    constructor(){
        process.on("uncaughtException", this.onException)
    }

    protected onException(e: Error){
        // console.log(e);
        if(e instanceof AppError){
            process.stdout.write(`Application Error: ${e.message} \n`);
            process.exit();
        }
        throw e;
    }
}