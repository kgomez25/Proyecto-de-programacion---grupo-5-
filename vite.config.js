// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⬅️ ¡CORRECCIÓN CLAVE! Usamos la ruta directa para evitar errores de variable.
export default defineConfig({
  base: '/Proyecto-de-programacion---grupo-5-/', 
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