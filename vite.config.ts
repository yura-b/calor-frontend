import {defineConfig, type PluginOption} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import {visualizer} from 'rollup-plugin-visualizer';
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
    server: {https: true},

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@layouts': path.resolve(__dirname, './src/layouts'),
        },
    },
    plugins: [react(), visualizer() as PluginOption, mkcert()],
})
