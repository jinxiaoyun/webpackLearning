var webpack = require('webpack');
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'app');
var BUILD_PATH = path.resolve(ROOT_PATH,'build');
var TEM_PATH = path.resolve(APP_PATH,'templates');


module.exports = {
	
	entry:{
		app:path.resolve(APP_PATH,'index.js'),
		mobile:path.resolve(APP_PATH,'mobile.js'),
		vendors:['jquery','moment']
	},

	output:{
		path:BUILD_PATH,
		filename:'[name].[hash].js'
	},
	plugins:[
		//使用uglifyJs压缩js代码
		new webpack.optimize.UglifyJsPlugin({minimize:true}),

		//把入口文件里面的数组打包成vendors.js
		new webpack.optimize.CommonsChunkPlugin({
			name:'vendors',
			filename:'vendors.js'
		}),

		new HtmlwebpackPlugin({
			title:'Hello app',
			template:path.resolve(TEM_PATH,'index.html'),
			filename:'index.html',
			chunks:['app','vendors'],//告诉插件要引用entry里面的哪几个入口
			inject:'body'//要把script标签插入到哪个标签里面
		}),
		new HtmlwebpackPlugin({
			title:'Hello mobile',
			template:path.resolve(TEM_PATH,'mobile.html'),
			filename:'mobile.html',
			chunks:['mobile','vendors'],//告诉插件要引用entry里面的哪几个入口
			inject:'body'//要把script标签插入到哪个标签里面
		}),

		new webpack.ProvidePlugin({
			$:'jquery',
			jQuery:'jquery',
			'window.Jquery':'jquery'
		})
	],
	module:{
		rules:[
			{
				test:/\.scss$/,
				loaders:['style-loader','css-loader','sass-loader'],
				include:APP_PATH
			},
			{
				test:/\.(png|jpg)$/,
				loader:'url-loader?limit=40000'
			},
			{
				test:/\.jsx?$/,
				loader:'babel-loader',
				include:APP_PATH,
				query:{
					presets:['es2015']
				}
			},
			{
				test:/\.jsx?$/,
				include:APP_PATH,
				enforce:'pre',
				use:[
					{
						loader:'jshint-loader',
						options:{
							esversion:6
						}
					}
				]
				
			}
		]
	}
}