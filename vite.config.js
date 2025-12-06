// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// El nombre del repositorio es 'Proyecto-de-programacion---grupo-5-'
const repoName = '/Proyecto-de-programacion---grupo-5-/' 

// https://vitejs.dev/config/
export default defineConfig({
  // BASE: Corrige la ruta base para GitHub Pages
  base: repoName, 
  
  plugins: [react()],
  
  // BUILD: Asegura que el index.html se encuentre y se use
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html', // Indica explícitamente el punto de entrada
      },
    },
  },
})
