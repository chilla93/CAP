const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        "filename": "main.ts",
        "path": path.resolve(__dirname, "lib")
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    node: {
        __filename: true,
        __dirname: true,
    },
    mode: "production",
    target: "node"
}