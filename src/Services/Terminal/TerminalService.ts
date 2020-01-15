import BaseService from "../BaseService";
import { interval, Subscription } from 'rxjs';
import moment from "moment";
// import {timeInterval} from 'rxjs/operators';



export default class TerminalService extends BaseService {
    //Terminal Control Prefix
    private readonly tcp: string = '\x1B[';
    private timerSubscription: Subscription | null = null;
    private startTime: number = 0;

    constructor(){
        super();
        var _onInput = this.onInput.bind(this);
        //process.stdin.on('readable', _onInput)
    }

    onInput(){
        let chunk;
        // Use a loop to make sure we read all available data.
        while ((chunk = process.stdin.read()) !== null) {
          process.stdout.write(`data: ${chunk}`);
        }
    }

    onExit(callback: NodeJS.ExitListener){
        process.on("exit", callback);
    }

    onCancel(callback: NodeJS.SignalsListener){
        process.on("SIGINT", (s) => {
            console.log("process exiting..... for sure for sure");
            callback(s);
        });
    }
    
    show(){
        return this.execute(`osascript -e 'tell application "System events" to set frontmost of application process "Terminal" to true'`);
    }

    hide (){
        return this.execute(`osascript -e 'tell application "System events" to set visible of application process "Terminal" to false'`);
    }

    startTimer(): void{
        const source = interval(1000);
        this.startTime = Date.now();
        const updateTimer = this.updateTimer.bind(this);
        console.log("Recording Started...\n");
        this.timerSubscription = source.subscribe(updateTimer);
        
    }

    stopTimer(): void{
        this.timerSubscription && this.timerSubscription.unsubscribe();
        this.timerSubscription = null;
    }

    updateTimer(i: number): void{
       const seconds = moment().diff(moment(this.startTime), "seconds");
       const displayMinutes = `${Math.floor(seconds/60)}`;
       const displaySeconds = `0${(seconds % 60)}`.slice(-2);;

       this.cursorUp();
       this.eraseLine();
       this.write(`${displayMinutes}:${displaySeconds}\n`);
    }

    cursorUp(steps = 1){
        const command = `${this.tcp}${steps}A`;
        this.write(command)
    }

    cursorDown(steps = 1){
        const command = `${this.tcp}${steps}B`;
        this.write(command)
    }

    cursorHome(){
        const command = `${this.tcp}H`;
        this.write(command)
    }

    eraseLine(){
        const command = `${this.tcp}2K`;
        this.write(command)
    }

    sleep(duration: number = 1000): Promise<void>{
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, duration);
        })
    }
}