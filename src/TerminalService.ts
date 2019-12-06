import BaseService from "./BaseService";

export default class TerminalService extends BaseService {
    constructor(){
        super();
    }

    show(){
        return this.execute(`osascript -e 'tell application "System events" to set frontmost of application process "Terminal" to true'`);
    }

    hide (){
        return this.execute(`osascript -e 'tell application "System events" to set visible of application process "Terminal" to false'`);
    }

    sleep(duration: number = 1000): Promise<void>{
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, duration);
        })
    }
}