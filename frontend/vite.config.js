// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,          // Optional: Change to your desired dev port
    open: true,          // Optional: Opens browser on dev start
  },
  resolve: {
    alias: {
      '@': '/src',       // Optional: Allows use of "@/components/..." in imports
    },
  },
})
