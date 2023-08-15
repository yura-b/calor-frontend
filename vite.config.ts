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
            '@pages': path.resolve(__dirname, './src/pages'),
            '@routes': path.resolve(__dirname, './src/routes'),
            '@styles': path.resolve(__dirname, './src/styles'),
            '@translations': path.resolve(__dirname, './src/translations'),
            '@images': path.resolve(__dirname, './src/assets/images'),
        },
    },
    plugins: [react(), visualizer() as PluginOption, mkcert()],
})

