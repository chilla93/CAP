import TerminalService from "./Services/TerminalService";
import minimist from "minimist";
import StreamService from "./Services/StreamService";

export default class CapController {
    private streamService: StreamService;
    constructor(){
        this.streamService = new StreamService();
    }

    capture(){
        this.streamService.grabDesktop();
    }
}