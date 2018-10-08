/* Webpack configuration - dev */

const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const devConfig = {
    mode: 'development', // https://webpack.js.org/concepts/mode/
    devtool: 'inline-source-map',
    output: {
        filename: '[name].js',
        // output things to here so they become part of our dist
        path: options.outputPath,
        publicPath: '/build/dist',
    },
    devServer: {
        proxy: {
            "/app": {
                target: 'http://localhost:6543',
                pathRewrite: {'^/app': ''}
            }
        }
    }
};

module.exports = new Promise((resolve, reject) => {
    common({}).then(commonConfig => {
        return merge(commonConfig, devConfig);
    }).then(config => {
        console.log("config = ", config);
        return config;

    })
        .then(resolve)
});

