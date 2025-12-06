// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // ⬅️ Base: Rutas relativas para que funcione en subdirectorios (GitHub Pages)
  base: './', 
  plugins: [
    react(),
  ],
  build: {
    outDir: 'dist',
    // ⬅️ ¡CORRECCIÓN CLAVE! Forzamos la carpeta de assets a estar en la raíz del build.
    assetsDir: '', 
    rollupOptions: {
      input: {
        main: 'index.html', // Punto de entrada
      },
    },
  },
})