/* Webpack configuration - dev */

const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const appConfig = require('./heptet-app-config');
const EntryPoints = require('heptet-app-webpack-plugin/lib/EntryPoints');

const entryPoints = new EntryPoints(appConfig.entry_points_json_endpoint)

const devConfig = {
    mode: 'development', // https://webpack.js.org/concepts/mode/
    devtool: 'inline-source-map',
    devServer: {
        proxy: {
            "/app": {
                target: 'http://localhost:6543',
                pathRewrite: {'^/app': ''}
            }
        }
    }
};

// Promise.all([
//         Promise.resolve(commonConfig),
//     ]).then(configs => merge(...configs));

module.exports = Promise.all([
    common({}),
    Promise.resolve(devConfig),
    entryPoints.getPromise().then(entryPoints.entryPointsToEntry).then(entry => {
        {
            entry
        }
    }),
]).then(configs => merge(...configs));

