import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// Served from https://kasularevanth.github.io/Revanthportfolio/
export default defineConfig({
  plugins: [react()],
  base: '/Revanthportfolio/',
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
