import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxying API requests to handle CORS during development
      '/ask': {
        target: 'https://fastapi-production-b960.up.railway.app',
        changeOrigin: true,
        secure: false, // if you have SSL issues, otherwise it can be omitted
        // rewrite: (path) => path.replace(/^\/ask/, '')
      }
    }
  }
})
