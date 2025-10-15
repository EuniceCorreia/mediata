import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
      port: 5173,  // Seu port frontend
      proxy: {
        '/api': {  // Proxy para backend (chamadas /api vão para 7027)
          target: 'https://localhost:7027',
          changeOrigin: true,
          secure: false  // Ignora HTTPS self-signed para dev
        }
      }
    }
  })