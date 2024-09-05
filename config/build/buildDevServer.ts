import type { Configuration as DevServerConf } from 'webpack-dev-server'
import { BuildOptions } from './types/types'


export function buildDevServer({port}: BuildOptions): DevServerConf {
    return {
        port: port ?? 3000,
        open: true,
        historyApiFallback: true
    }
}