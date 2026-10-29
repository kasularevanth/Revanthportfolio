import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://kasularevanth.github.io/Revanthportfolio/
export default defineConfig({
  plugins: [react()],
  base: '/Revanthportfolio/',
})
