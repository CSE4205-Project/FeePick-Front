import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
        '/api': {
            target: 'http://13.214.177.250:5001/',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
        }
    }
  }
})
