import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      clientPort: 443
    },
    allowedHosts: [
      'custody-schedule.replit.app',
      '.replit.app',
      '.repl.co'
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      'custody-schedule.replit.app',
      '.replit.app',
      '.repl.co'
    ]
  }
})

