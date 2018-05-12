var webpack = require('webpack');
var path = require('path');

var parentDir = path.join(__dirname, '../');

module.exports = {
	entry: [
		path.join(parentDir, 'index.js')
	],
	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.(less)$/,
			exclude: /node_modules/,
			loaders: ["style-loader", "css-loder", "less-loader"]
		}, {
			test: /\.scss$/,
			exclude: /node_modules/,
			use: [
					"style-loader", // creates style nodes from JS strings
					"css-loader", // translates CSS into CommonJS
					"sass-loader" // compiles Sass to CSS
			]
		}]
	},
	output: {
		path: parentDir + '/dist',
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: parentDir,
		historyApiFallback: true
	}
}
