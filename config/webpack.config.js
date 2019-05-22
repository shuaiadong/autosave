const path = require('path');
module.exports = {
    entry: {
        index: [path.resolve(__dirname, '../autoSave.js')]
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, '../lib/')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'

            }
        ]  
    }
}