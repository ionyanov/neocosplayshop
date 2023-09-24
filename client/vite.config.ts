import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(),
    visualizer({
        template: 'treemap', // or sunburst
        open: true,
        gzipSize: true,
        brotliSize: true,
        filename: 'analyse.html', // will be saved in project's root
    }) as PluginOption],
    resolve: {
        alias: [{ find: '@', replacement: '/src' }],
    },
    define: {
        /*_IS_DEV_: JSON.stringify(true),
        _API_URL_: JSON.stringify('http://localhost:5000/api'),*/
        _IS_DEV_: JSON.stringify(false),
        _API_URL_: JSON.stringify('/api'),
    },
});
