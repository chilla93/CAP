import TerminalService from "./TerminalService";
import minimist from "minimist";

export default class CapController {
    private terminalService: TerminalService;
    constructor(){
        this.terminalService = new TerminalService();
    }

    capture(){
        console.log("start desktop capture");
    }
}