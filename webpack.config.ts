import path from 'path'
import webpack from 'webpack'
import 'webpack-dev-server'
import {buildWebpack} from './config/build/buildWebpack'
import {BuildPaths, Mode, Platform} from './config/build/types/types'

interface EnvVariables {
	mode?: Mode
	port?: number
	analyser?: boolean
	platform?:Platform
}

export default (env: EnvVariables) => {
	const paths: BuildPaths = {
		output: path.resolve(__dirname, 'build'),
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		src: path.resolve(__dirname, "src"),
		public: path.resolve(__dirname, "public"),
	}

	const config: webpack.Configuration = buildWebpack({
		port: env.port ?? 3000,
		mode: env.mode ?? 'development',
		paths,
		analyser: env.analyser,
		platform: env.platform ?? "desktop",
	})

	return config
}
