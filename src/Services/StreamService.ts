import { exec, spawn } from "child_process";
import ffmpeg from "ffmpeg-static";
import BaseService from "./BaseService";
import TerminalService from "./TerminalService";
import fs from "fs";

export default class StreamService extends BaseService {
    public f:string;
    private terminalService: TerminalService;
    private outputStream: Array<string | Buffer> = [];
    constructor(){
        super();
        console.log("hello CAP world")
        this.f = ffmpeg.path;
        this.terminalService = new TerminalService();

        //process.on('exit', this.onExit.bind(this));

        var onExit = this.onExit.bind(this);
        this.terminalService.onExit(() => onExit());
        // this.terminalService.onCancel((s) => {
        //     console.log(s);
        //     onExit()
        // });
    }

    capture(){
        console.log("start desktop capture");

        //this.terminalService.startTimer();
        const _this = this;
        this.terminalService.sleep(10000).then(function(){
            console.log("the work is done");
            _this.terminalService.stopTimer();
            //process.exit();
        });
    }

    pipingExample(): void{
        const file = fs.createWriteStream(`video-${Date.now()}.mkv`);
        file.on('ready', () => {
            console.log("it is currently ready to right something");
            const ls = spawn(this.f, ['-y', '-f', 'avfoundation', '-framerate', '30', 
            '-pixel_format', 'uyvy422', '-i', '1:0', '-c:v', 
            'libx264', '-preset', 'fast', '-r', '30', '-crf', '18', 
            '-pix_fmt', 'yuv420p', '-f',  'matroska', 'pipe:1']);

            ls.stdout.pipe(file);                            
            ls.stderr.pipe(process.stderr);
            ls.on('exit', () => {
                console.log("we are exiting");
                file.end();
            })

            this.terminalService.sleep(5000).then(() => {
                console.log("we have closed it");            
                ls.kill('SIGINT');
                //file.end();
            })
        })

        file.on('close', () => {
            console.log("closed");
            
        })

    }

    grabDesktop(filename: string | null = null){
        filename = filename || `output-${Date.now()}.mp4`;

        const ls = spawn(this.f, ['-y', '-f', 'avfoundation', '-framerate', '30', 
        '-pixel_format', 'uyvy422', '-i', '1:none', '-c:v', 
        'libx264', '-preset', 'fast', '-r', '30', '-crf', '18', 
        '-pix_fmt', 'yuv420p', filename ]);

        ls.stderr.on('data', this.onOutput.bind(this));
        // ls.stderr.pipe(process.stdout);
        // this.terminalService.sleep(5000).then(() => console.log("sdfs"))
    }


    onExit (){
        console.log("program exited");
        console.log(this.outputStream);
    }

    onOutput( output: string | Buffer){
        var outputString = output.toString();
        if((/(?=.*frame)(?=.*q=)(?=.*fps)(?=.*size)(?=.*time)(?=.*bitrate)/i).test(outputString)){
            //this.outputStream.push(outputString);
            process.stdout.write(output);
        }
        // console.log(output);
    }
}