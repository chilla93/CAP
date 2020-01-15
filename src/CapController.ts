import { ICapRequest } from './Models/Requests';
import TerminalService from "./Services/Terminal/TerminalService";
import minimist, { Opts, ParsedArgs } from "minimist";
import StreamService from "./Services/Stream/StreamService";
import DefaultCommandOptions from "./Constants/DefaultCommandOptions";
import BaseController from "./BaseController";
import AppError from "./Models/AppError";


export default class CapController extends BaseController {
    private streamService: StreamService;
    public static commandOptions: Opts = {
        string: 'f',
        default: {
            f: "capture"
        },
        // stopEarly: true
        unknown: (arg: string) => {
            console.log(arg);
            return false;
        }
    };
    public functionRoutes: {[key:string] : (args: string[]) => void} = {
        "capture": this.capture.bind(this)
    }
    private parsedRequest: ICapRequest;
    constructor(){
        super();
        this.streamService = new StreamService();
        const args = process.argv.slice(2);
        this.parsedRequest = {functionKey: '', arguments: []}
        
        if(args[0] === '-f' && args.length > 1){
            this.parsedRequest = {functionKey: args[1], arguments: args.slice(2)}
        }

        //console.log("provided options", this.options);
    }

    start(){
        const calledFunction = this.functionRoutes[this.parsedRequest.functionKey];
        if(!!calledFunction){
            calledFunction(this.parsedRequest.arguments)
            return;
        }

        throw new AppError(`Function '${this.parsedRequest.functionKey}' was not found`);
    }

    capture(args: string[]){
        // this.streamService.grabDesktop();
        this.streamService.grabDesktopUsingArgs(args);
    }
}