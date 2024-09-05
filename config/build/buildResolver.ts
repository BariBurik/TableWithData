import { BuildOptions } from "./types/types";

export function buildResolver(options: BuildOptions) {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': options.paths.src,
        }
    }
}