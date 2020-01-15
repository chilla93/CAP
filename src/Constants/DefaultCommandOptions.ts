import { Opts } from "minimist";
import AppError from "../Models/AppError";

export default {
    unknown: (arg) => {
        throw new AppError(`Argument '${arg}' is invalid \n`);
        return false;
   }
} as Opts;