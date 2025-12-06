// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// CLAVE: Asegura la ruta base correcta para tu repositorio
const repoName = '/Proyecto-de-programacion---grupo-5-/' 

export default defineConfig({
  base: repoName, 
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html', // Punto de entrada
      },
    },
  },
})
