module.exports = {
    entry: 'js/',
    output: {
        filename: 'game.js',
        path: __dirname + '/build'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader", // compiles Sass to CSS
                options: {
                    includePaths: [ 'sass/' ],
                    outputStyle: 'compressed',
                    outFile: 'build/style.css'
                }
            }]
        }]
    }
};
