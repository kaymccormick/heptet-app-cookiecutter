/* Webpack configuration - common */

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HeptetAppWebpackPlugin = require('heptet-app-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = function (entryPointsPromise, options) {
    return entryPointsPromise.then(entryPoints => options.entryPoints = entryPoints)
        .then(options.entryPoints.entryPointsToEntry).then(entry => {
            return {entry}
        }).then(config => {

            const packageInfo = require(path.resolve(__dirname, 'package.json'));
            const packages = packageInfo.us_heptet[packageInfo.name].packages;

            const packageRoot = path.resolve(__dirname, packages[0]);
            const buildDir = path.resolve(packageRoot, 'build');
            const outputPath = path.resolve(buildDir, 'dist');
            const templateOutputPath = path.resolve(buildDir, 'templates');

            options.packageRoot = packageRoot;
            options.buildDir = buildDir;
            options.outputPath = outputPath;
            options.templateOutputPath = templateOutputPath;
            options.context = __dirname;

            const commonConfig = {
                target: 'web',
                context: __dirname,
                output: {
                    filename: '[name].js',
                    // output things to here so they become part of our dist
                    // this path relates to publicpath!
                    path: options.outputPath,
                    publicPath: '/build/dist',
                },

                resolve: {modules: ['.', 'node_modules']},
                plugins: [
                    new HeptetAppWebpackPlugin(options),
                    new webpack.ProvidePlugin({
                        $: 'jquery',
                        jQuery: 'jquery'
                    }),
                ],
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

            return merge(commonConfig, config);

        })
};
