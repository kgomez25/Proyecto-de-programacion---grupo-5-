// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⬅️ ¡CORRECCIÓN CLAVE! Tienes que definir esta variable para usarla abajo.
const repoName = '/Proyecto-de-programacion---grupo-5-/' 

export default defineConfig({
  base: repoName, 
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