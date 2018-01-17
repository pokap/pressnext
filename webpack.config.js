const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const extractSass = new ExtractTextPlugin({
    filename: 'build/style.css',
    allChunks: true
});

module.exports = {
    entry: ['./src/index.js','./sass/src/pressnext.scss'],
    output: {
        filename: 'build/bundle.js'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        }]
    },
    plugins: [
        extractSass,
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]
};
