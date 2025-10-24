import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,   // automatically opens the browser on npm run dev
  },
  build: {
    outDir: 'dist', // Vercel will use this folder for deployment
  }
})
