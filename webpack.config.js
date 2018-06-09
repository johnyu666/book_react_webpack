const path = require('path');

module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase:'./dist'
    },
    module: {
        rules: [
            {test: /\.css$/,use: ['style-loader','css-loader']},
            {test:/\.(img|svg|ico|jpeg)$/,use:['file-loader']},

            {test:/\.js$/,exclude:/node_modules/,
                use:[{
                    loader: "babel-loader",
                    options: {
                        presets:['env' ,'react']
                    }
                }]
            },

            {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,use: ['url-loader']},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,use: ['url-loader']},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,use: ['url-loader']},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,use: ['url-loader']},


            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                },{
                    loader: 'expose-loader',
                    options: '$'
                }]
            }
        ]

    }
};
