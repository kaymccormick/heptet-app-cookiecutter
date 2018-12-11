/* Webpack configuration - common */

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HeptetAppWebpackPlugin = require('heptet-app-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const packageInfo = require(path.resolve(__dirname, 'package.json'));
const packages = packageInfo.us_heptet[packageInfo.name].packages;

const packageRoot = path.resolve(__dirname, packages[0]);
const buildDir = path.resolve(packageRoot, 'build');
const outputPath = path.resolve(buildDir, 'dist');
const templateOutputPath = path.resolve(buildDir, 'templates');
const htmlWebpackTemplate = require('html-webpack-template');

const options = {};

options.packageRoot = packageRoot;
options.buildDir = buildDir;
options.outputPath = outputPath;
options.templateOutputPath = templateOutputPath;
options.context = __dirname;

const entryPoints = require('./entry_points').entry_points;
const heptetAppWebpackPlugin = new HeptetAppWebpackPlugin({
    entryPoints,
    templateOutputPath,
    //htmlWebpackPluginTemplateFunc: entryPoint => htmlWebpackTemplate,
    htmlWebpackPluginTemplateFunc: entryPoint => 'src/assets/entry_point_generic.html',
});
const entry = heptetAppWebpackPlugin.entryPointsToEntry();

module.exports = {
    // heptet_app: {
    //     entryPoints: { filename: 'entry_points.json' },
    // },
    entry,
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
        heptetAppWebpackPlugin,
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
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
            presets: ["@babel/preset-react"],
	    plugins: ["@babel/plugin-proposal-class-properties"],
        }
      }
    ],
	    },
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
