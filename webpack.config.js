const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        port: 7777
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        inject: true,
        minify: false,}),
        new MiniCssExtractPlugin(),
new CopyPlugin({
    patterns: [
        {from: './src/assets/images', to: 'images'},
        {from: './src/assets/fonts', to: 'fonts'}
    ]
})
    ],
    module: {
    rules: [
        // {
        //     test: /\.(ts[x]?|js[x]?)$/,
        //     use: [{
        //         loader: 'babel-loader',
        //         options: { babelrc: true },
        //     }],
        //     exclude: /node_modules/,
        // },
        {
            test: /\.(scss|css)$/,
            use: [
                // We're in dev and want HMR, SCSS is handled in JS
                // In production, we want our css as files
                // 'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    
                },
                'sass-loader',
            ],
        },
        {
            test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
            type: 'javascript/auto',
            loader: 'file-loader',
            options: {
                // publicPath: '../',
                name: '[path][name].[ext]',
                context: path.resolve(__dirname, 'src/assets'),
                emitFile: false,
                esModule: false
            },
        },
        {
            test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
            type: 'javascript/auto',
            exclude: /images/,
            loader: 'file-loader',
            options: {
                // publicPath: '../',
                context: path.resolve(__dirname, 'src/assets'),
                name: '[path][name].[ext]',
                emitFile: false,
                esModule: false
            },
        },
    ],
},
}