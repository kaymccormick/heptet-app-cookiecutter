// ``webpack.dev.js'' Generated for {{ cookiecutter.project_name }} [{{cookiecutter.repo_name}}]
// ``webpack.dev.js'' Generated for Heptet App Scaffold [heptet_app_scaffold]
/* Webpack configuration - dev */
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const appConfig = require('./heptet-app-config');

const options = {appConfig};

const devConfig = {
    mode: 'development', // https://webpack.js.org/concepts/mode/
    devtool: 'inline-source-map',
    devServer: {
        proxy: {
            "/app": {
                target: 'http://localhost:6643',
                pathRewrite: {'^/app': ''}
            }
        }
    }
};

module.exports = merge(common, devConfig);
