/* Webpack configuration - common */

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HeptetAppWebpackPlugin = require('heptet-app-webpack-plugin');
const webpack = require('webpack')
const merge = require('webpack-merge');

module.exports = function (options) {
    const packageInfo = require(path.resolve(__dirname, 'package.json'));
    packages = packageInfo.us_heptet[packageInfo.name].packages;

    const packageRoot = path.resolve(__dirname, packages[0]);
    const buildDir = path.resolve(packageRoot, 'build');
    const outputPath = path.resolve(buildDir, 'dist');
    const templateOutputPath = path.resolve(buildDir, 'templates');

    options.packageRoot = packageRoot;
    options.buildDir = buildDir;
    options.outputPath = outputPath;
    options.templateOutputPath = templateOutputPath;
    options.context = __dirname;
    options.entry_points_json_endpoint = 'http://127.0.0.1:6643/entry_points_json';

    const appPlugin = new HeptetAppWebpackPlugin(options);
    const plugins = [
        appPlugin,
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
    ];

    const commonConfig = {
        output: {
            filename: '[name].js',
            // output things to here so they become part of our dist
            path: options.outputPath,
            publicPath: '/build/dist',
        },

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
    ]).then(configs => merge(...configs));
};
