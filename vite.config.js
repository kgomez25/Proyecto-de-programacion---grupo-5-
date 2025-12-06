// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⬅️ CORRECCIÓN FINAL: Usamos la ruta relativa '.' (un solo punto)
// Esto es la opción más sencilla y a menudo corrige los errores de path.
export default defineConfig({
  base: '.', 
  plugins: [
    react(),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html', // Punto de entrada
      },
    },
  },
})