// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Nombre del repositorio para la ruta base de GitHub Pages
const repoName = '/Proyecto-de-programacion---grupo-5-/' 

// https://vitejs.dev/config/
export default defineConfig({
  // **CLAVE:** Corrige la ruta base para que los assets carguen correctamente
  base: repoName, 
  
  plugins: [react()],
  
  // CLAVE: Asegura que el index.html se encuentre
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html', // Indica explícitamente el punto de entrada
      },
    },
  },
})
