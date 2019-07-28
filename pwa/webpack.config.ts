import * as HtmlPlugin from 'html-webpack-plugin';
import PathsPlugin from 'tsconfig-paths-webpack-plugin';
import { Configuration } from 'webpack';
import { DistDir, Extensions, PwaSrcDir } from '../util/Paths';

const isProd = !!process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase().indexOf('prod') >= 0;

export default (): Configuration => ({
	mode: isProd ? 'production' : 'development',
	devtool: isProd ? 'cheap-source-map' : 'source-map', // TODO: find better value
	target: 'web',

	entry: {
		app: PwaSrcDir('index')
	},

	devServer: {
		port: 3000,
		historyApiFallback: true
	},

	output: {
		path: isProd ? DistDir('assets', 'scripts') : DistDir(),
		filename: '[name].js'
	},

	resolve: {
		extensions: Extensions,

		plugins: [
			new PathsPlugin({
				extensions: Extensions
			})
		]
	},

	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /.*\.tsx?$/,
				use: [
					{ loader: 'ts-loader' }
				]
			}
		]
	},

	plugins: [
		new HtmlPlugin({
			filename: DistDir('index.html')
		})
	]
});
