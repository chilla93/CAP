const path = require("path");

module.exports = {
    entry: "./src/index.ts",
    output: {
        "filename": "main.js",
        "path": path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            { test: /\.(ts|js)$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    node: {
        __filename: true,
        __dirname: true,
    },
    mode: "development",
    devtool: "inline-source-maps",
    target: "node"
}