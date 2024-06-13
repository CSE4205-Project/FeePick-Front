import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
        '/api': {
            target: 'http://13.214.177.250:5001/',
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/api/, '')
        }
    }
  }
})
