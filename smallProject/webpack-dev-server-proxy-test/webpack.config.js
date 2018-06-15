var webpack = require('webpack');
module.exports = {
	entry: './src/main.js',
	output: {
		path: './',
		filename: 'index.js'
	},
	devServer: {
		historyApiFallback: true,
      	hot: true,
		inline: true,
		stats: { colors: true },
		proxy: {
	        '/list': {
	          target: 'http://www.baidu.com:9000',
	          pathRewrite: {'^/column' : '/column'},
	          changeOrigin: true
	        },
	        ///ok/ok  --> http://www.baidu.com/api/information/podcastserver/1.0.0/episodes/category/57959fd6b05063000b284f58?page_no=1&page_size=1
	        '/ok':{
	        	target: 'http://www.baidu.com/api/information/podcastserver/1.0.0',
	        	pathRewrite: {'^/ok':'/episodes/category/57959fd6b05063000b284f58?page_no=1&page_size=10'},
	        	changeOrigin: true
	        },

	        //	/categories -->http://www.baidu.com/api/information/podcastserver/1.0.0/categories
	        '/categories': {
	        	target: 'http://www.baidu.com/api/information/podcastserver/1.0.0',
	        	pathRewrite: {'^/': '/'},
	        	changeOrigin: true
	        }
	     }
	},
	plugins: [new webpack.ProvidePlugin({
		$: 'n-zepto'
	})],
	module: {
		loaders: 
		[
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015','react']
				}
			},{
				test: /\.(jpg|png|gif)$/,
				loader: 'url-loader?limit=8192'
			},{
				test: /\.scss/,
				loader: 'style-loader!css-loader!sass-loader'
			}
		]
	}
};