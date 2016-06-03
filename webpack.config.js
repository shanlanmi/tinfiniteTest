var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {

    entry: {
        bankCardInput : './src/js/bankCardInput.js'
    },

    output: {
        path: './dist',
        filename: '[name].js',
        /*
        library: 'bankCardInput',
        libraryTarger: 'umd'
        */
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            { test: /\.sass$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    resolve: {
        root: '/Users/shanlanmi/Documents/tinfiniteTest', 
        extensions: ['', '.js', '.json', '.sass'],
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }
};
