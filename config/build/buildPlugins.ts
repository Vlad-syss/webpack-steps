import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import {Configuration, DefinePlugin, ProgressPlugin} from 'webpack'
import {BuildOptions} from './types/types'
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer"
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import path from 'path'

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
	const isDev = options.mode === 'development'
	const isProd = options.mode === 'production'

	const plugins: Configuration['plugins'] = [
		new HtmlWebpackPlugin({
			template: options.paths.html,
			favicon: path.resolve(options.paths.public, "favicon.ico"),
		}),
		new	DefinePlugin({
			__PLATFORM__: JSON.stringify(options.platform)
		}),
	]
	if (isDev) {
		plugins.push(new ProgressPlugin())
		plugins.push(new ForkTsCheckerWebpackPlugin())
		plugins.push(new ReactRefreshPlugin())
	}

	if (isProd) {
		plugins.push(
			new MiniCssExtractPlugin({
				filename: 'css/[name].[contenthash:8].css',
				chunkFilename: 'css/[name].[contenthash:8].css',
			})
		)
		plugins.push(
			new CopyPlugin({
				patterns: [
					{ from: path.resolve(options.paths.public, "lang"), to: path.resolve(options.paths.output, "lang") },

				],
			}),
		)
	}
	if(options.analyser){
		plugins.push(new BundleAnalyzerPlugin())
	}

	return plugins
}
