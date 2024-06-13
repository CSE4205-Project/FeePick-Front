import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
        '/api': {
            target: 'http://13.214.177.250:5001/',
            changeOrigin: true,
            secure: false, // HTTPS에서 HTTP로 요청을 허용하는 옵션
            rewrite: (path) => path.replace(/^\/api/, '')
        }
    }
  }
})
