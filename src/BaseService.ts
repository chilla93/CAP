import { exec } from "child_process";

export default class BaseService {
    constructor(){

    }

    execute(command: string): Promise<string>{
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if(error){
                    reject(stderr);
                }
                else{
                    resolve(stdout);
                }
            })
        });
    }
} 