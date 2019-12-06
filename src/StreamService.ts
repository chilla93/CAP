import { exec } from "child_process";
import ffmpeg from "ffmpeg-static";
import BaseService from "./BaseService";

export default class StreamService extends BaseService {
    public f:string;
    constructor(){
        super();
        console.log("hello CAP world")
        this.f = ffmpeg.path;
    }

    capture(){
        exec("say something")
    }

    onExit (){
        console.log("program exited");
    }

    onOutput( info: string){
        console.log(info)
    }
}