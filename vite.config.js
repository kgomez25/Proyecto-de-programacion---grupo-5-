import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Asegúrate de que este string sea EXACTO al nombre de tu repo en la URL de GitHub
// https://github.com/kgomez25/Proyecto-de-programacion---grupo-5-
const repoName = '/Proyecto-de-programacion---grupo-5-/'

export default defineConfig({
  base: repoName,
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})