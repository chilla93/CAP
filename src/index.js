import { spawn, exec } from "child_process";
import path from "path";
import ffmpeg from "ffmpeg-static";

console.log("hello CAP world")
// var pathToModule = require.resolve('ffmpeg-static');
// var pathToModule = path.dirname(require.resolve('ffmpeg-static'));
var f = ffmpeg.path;

console.log(f);

// exec(`${pathToModule}${f}`, (error, stdout, stderr) => {
//     if (error) {
//         console.error(`exec error: ${error}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
//     console.error(`stderr: ${stderr}`);
// });