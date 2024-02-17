import webpack from 'webpack'
import { buildDevServer } from './buildDevServer'
import { buildLoader } from './buildLoader'
import { buildPlugins } from './buildPlugins'
import { buildResolvers } from './buildResolvers'
import { BuildOptions } from './types/types'

export function buildWebpack(options: BuildOptions): webpack.Configuration {
	const isDev = options.mode === 'development'

	return {
		mode: options.mode ?? 'development',
		entry: options.paths.entry,
		output: {
			path: options.paths.output,
			filename: '[name].[contenthash].js',
			clean: true,
		},
		plugins: buildPlugins(options),
		module: {
			rules: buildLoader(options),
		},
		resolve: buildResolvers(options),
		devtool: isDev && 'inline-source-map',
		devServer: isDev ? buildDevServer(options) : undefined,
	}
}
