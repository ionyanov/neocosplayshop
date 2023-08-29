import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [{find: '@', replacement: '/src'}],
    },
    define: {
        _IS_DEV_: JSON.stringify(true),
        _API_URL_: JSON.stringify('http://localhost:8000'),
        _PROJECT_: JSON.stringify('frontend'),
    },
})
