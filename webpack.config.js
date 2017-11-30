const HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    path = require('path');

const AppDir = path.resolve(__dirname,'src'),
      DistDir = path.resolve(__dirname,'dist');

module.exports = {
    entry: AppDir + '/app.js',
    output: {
        path: DistDir,
        filename: 'app.bundle.js'
    },
    module: {
        rules:[
            {
                test: [/\.scss$/],
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader",'sass-loader']
                  })
            },
            {
                test: /\.js$/,
                exclude:/node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use:'file-loader'
            }
        ]
    }, 
    devServer: {
        contentBase: DistDir,
        compress:true,
        port:9000,
        stats: "errors-only",
        open:true
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'weatherCheck',
          minify: {
              collapseWhitespace:true
          },
          hash:true,
          template: './src/my-index.html', // Load a custom template (lodash by default see the FAQ for details)
        }),
        new ExtractTextPlugin('app.css')
      ]
}