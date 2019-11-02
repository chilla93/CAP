const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        "filename": "main.js",
        "path": path.resolve(__dirname, "lib")
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    mode: "production",
    target: "node"
}