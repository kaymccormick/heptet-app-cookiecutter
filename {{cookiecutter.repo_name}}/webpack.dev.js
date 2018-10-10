/* Webpack configuration - dev */

const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const appConfig = require('./heptet-app-config');
const EntryPoints = require('heptet-app-webpack-plugin/lib/EntryPoints');

const entryPoints = new EntryPoints(appConfig.entry_points_json_endpoint);
const options = { entryPoints, appConfig };

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

module.exports = common(entryPoints.getEntryPointsPromise(), options).then(config => merge(config, devConfig)).then(config => {
        console.log("final config", config);
        return config;
    });
