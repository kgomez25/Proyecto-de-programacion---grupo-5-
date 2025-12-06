// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⬅️ CORRECCIÓN FINAL: Usamos la ruta absoluta del repositorio.
// La barra inclinada final es CRÍTICA.
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