import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import {ModuleOptions} from 'webpack'
import ReactRefreshTypeScript from "react-refresh-typescript"
import {BuildOptions} from './types/types'
import {BuildBabelLoader} from './babel/BuildBabelLoader'

export function buildLoader(options: BuildOptions): ModuleOptions['rules'] {
	const isDev = options.mode === 'development'

	const scssLoader = {
		// order have quality
		test: /\.s[ac]ss$/i,
		use: [
			// Creates `style` nodes from JS strings
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			// Translates CSS into CommonJS
			{
				loader: "css-loader",
				options: {
					modules: {
						localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
					},
				}
			},
			// Compiles Sass to CSS
			'sass-loader',
		],
	}

	const tsLoader = {
		//ts-loader work with JSX
		exclude: /node_modules/,
		test:/\.tsx?$/,
		use: [
			{
				loader:'ts-loader',
				options: {
					transpileOnly:isDev,
					getCustomTransformers: () => ({
						before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
					}),
				}
			}
		]
	}

	const babelLoader = BuildBabelLoader(options)

	const assetLoader = {
		test: /\.(png|jpg|jpeg|gif)$/i,
		type: "asset/resource",
	}

	const svgrLoader = {
		test: /\.svg$/i,
		issuer:/\.[jt]sx?$/,
		use: [
			{
				loader: '@svgr/webpack',
				options:{
					icon:true,
					svgoConfig: {
						plugins: [
							{
								name: 'convertColors',
								params: {
									currentColor: true,
								}
							}
						]
					}
				}
			}
		]
	}

	return [
		assetLoader,
		scssLoader,
		// tsLoader,
		svgrLoader,
		babelLoader,
	]
}
