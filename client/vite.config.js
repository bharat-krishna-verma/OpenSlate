import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
    allowedHosts:["4cc583f4f6d4.ngrok-free.app"],
    host: true, // ✅ Allow all hosts (e.g., ngrok public URLs)
    // OR: allowedHosts: ['a0d768d10d29.ngrok-free.app'] for specific domain
  }
})
