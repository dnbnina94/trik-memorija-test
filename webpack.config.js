const path = require("path");
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackObfuscator = require('webpack-obfuscator');

module.exports = (env) => {

    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
        entry: "./src/app.js",
        output: {
            path: path.join(__dirname, "public"),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    loader: "babel-loader",
                    test: /\.js$/,
                    exclude: /node_modules/   
                }, 
                {
                    test: /\.js$/,
                    exclude: [/node_modules/, /server/],
                    enforce: 'post',
                    use: { 
                        loader: WebpackObfuscator.loader, 
                        options: {
                            rotateStringArray: true
                        }
                    }
                },
                {
                    test: /\.s?css$/,
                    use: CSSExtract.extract({
                        use: [
                            {
                                loader: "css-loader",
                                options: {
                                    sourceMap: false
                                }
                            },
                            {
                                loader: "sass-loader",
                                options: {
                                    sourceMap: false
                                }
                            }
                        ]
                    })
                },
                {
                    test: /\.(svg|png|jpe?g|gif)$/i,
                    use: [
                      {
                        loader: 'file-loader',
                      },
                    ],
                }
            ]
        },
        plugins: [
            CSSExtract
        ],
        devServer: {
            contentBase: path.join(__dirname, "public"),
            historyApiFallback: true
        }
    }
}