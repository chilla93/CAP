import BaseService from "./BaseService";
import { interval, Subscription } from 'rxjs';
// import {timeInterval} from 'rxjs/operators';



export default class TerminalService extends BaseService {
    //Terminal Control Prefix
    private readonly tcp: string = '\x1B[';

    constructor(){
        super();
    }

    
    
    show(){
        return this.execute(`osascript -e 'tell application "System events" to set frontmost of application process "Terminal" to true'`);
    }

    hide (){
        return this.execute(`osascript -e 'tell application "System events" to set visible of application process "Terminal" to false'`);
    }

    startTimer(): Subscription{
        const source = interval(1000);
        return source.subscribe(i => console.log(i));
        
    }

    stopTimer(s: Subscription): void{
        s.unsubscribe();
    }

    cursorUp(steps = 1){
        const command = `${this.tcp}${steps}A`;
    }

    cursorDown(steps = 1){
        const command = `${this.tcp}${steps}B`;
    }

    sleep(duration: number = 1000): Promise<void>{
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, duration);
        })
    }
}