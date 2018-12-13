const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => ({
    entry: "./src/index.tsx",
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".mjs"]
    },
    target: "web",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "index.js"
    },
    externals: [],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
                exclude: [/node_modules/, /build/, /__test__/]
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto"
            },
            {
                test: /\.css$/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                        },
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ]
    },
    node: {
        fs: "empty",
        net: "empty"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html" // Specify the HTML template to use
        })
    ],
    devServer: {
        compress: true,
        disableHostCheck: true,
        port: 8080
    }
});
