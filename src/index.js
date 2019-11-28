import { spawn, exec } from "child_process";
import ffmpeg from "ffmpeg-static";
import minimist from "minimist";

console.log("hello CAP world")
var f = ffmpeg.path;

// console.log(f);
// console.log(process.argv)
// console.log(process.argv.slice(2))

// exec(`${f} -version`, (error, stdout, stderr) => {
//     if (error) {
//         console.error(`exec error: ${error}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
//     console.error(`stderr: ${stderr}`);
// });

function hide (){
    return execute(`osascript -e 'tell application "System events" to set visible of application process "Terminal" to false'`);
}

function sleep(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    })
}

function show(){
    return execute(`osascript -e 'tell application "System events" to set frontmost of application process "Terminal" to true'`);
}


function execute(command){
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

hide().then(sleep).then(show).then(() => {
    console.log("complete");
})