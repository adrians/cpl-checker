const path = require('path')

module.exports = {
    mode: "production",
    entry: './antlr4/index.js',
    output: {
        filename: 'antlr4.js',
        path: path.resolve(__dirname, 'dist'),
        // the name of the exported antlr4
        library: "antlr4",
        libraryTarget: 'window'
    },
    resolve: { fallback: { fs: false } },
    target: "web",
    module: {
        rules: [{
            test: /\.js$/,
        }]
    }
}
