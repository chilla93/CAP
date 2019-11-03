import { spawn, exec } from "child_process";
import ffmpeg from "ffmpeg-static";
import minimist from "minimist";

console.log("hello CAP world")
var f = ffmpeg.path;

console.log(f);
// console.log(process.argv)
// console.log(process.argv.slice(2))

exec(`${f} -version`, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});