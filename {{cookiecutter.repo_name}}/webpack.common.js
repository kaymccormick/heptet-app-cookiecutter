/* Webpack configuration - common */

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HeptetAppWebpackPlugin = require('heptet-app-webpack-plugin');
const webpack = require('webpack')
const merge = require('webpack-merge');

module.exports = function (options) {
    const appPlugin = new HeptetAppWebpackPlugin(options);
    const plugins = [
        appPlugin,
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
    ];

    const commonConfig = {
        resolve: {modules: ['.', 'node_modules']},
        plugins,
        node: {
            fs: "empty" // avoids error messages
        },
        module: {
            rules: [
                //{parser: {amd: false}},
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader',
//                        'postcss-loader',
                    ]
                },
                {
                    test: /\.(png|svg|jpe?g|gif)$/,
                    use: [
                        'file-loader'
                    ]

                }
            ]

        }
    };

    return Promise.all([
        Promise.resolve(commonConfig),
        appPlugin.app.get_entry_points().then(entry_points => {
            const entry = Object.create(null);
            for (const ep of entry_points) {
                entry[ep.key] = ep.fspath;
            }
            return {entry};
        })]).then(configs => merge(...configs));
};
