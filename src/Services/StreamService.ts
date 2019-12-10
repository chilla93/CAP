import { exec } from "child_process";
import ffmpeg from "ffmpeg-static";
import BaseService from "./BaseService";
import TerminalService from "./TerminalService";

export default class StreamService extends BaseService {
    public f:string;
    private terminalService: TerminalService;
    constructor(){
        super();
        console.log("hello CAP world")
        this.f = ffmpeg.path;
        this.terminalService = new TerminalService();
    }

    capture(){
        console.log("start desktop capture");
        //terminalservice start timer
        //terminalservice stop timer
        const timer = this.terminalService.startTimer();
        this.terminalService.sleep(10000).then(function(){
            console.log("the work is done");
            //process.exit();
        });
    }


    onExit (){
        console.log("program exited");
    }

    onOutput( info: string){
        console.log(info)
    }
}