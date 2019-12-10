import { exec, execSync } from "child_process";
import {Subject} from "rxjs";

export default class BaseService {
    constructor(){

    }

    execute(command: string): Promise<string>{
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if(error){
                    console.log("issue", error)
                    reject(stderr);
                }
                else{
                    resolve(stdout);
                }
            })
        });
    }

    interval(): void{      
        process.stdout.write('\x1B[34m');
        console.log("we are starting the timer");
        const self = this; 
        setInterval(function(){
            process.stdout.write('\x1B[34m');
            console.log(1);
            // process.stdout.write('\x1B[1A');
            // execSync('\x1B[K');
        }, 1000);
        console.log("after making start");
    }
} 