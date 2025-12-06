import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // ¡AÑADE ESTA LÍNEA O CAMBIA SU VALOR ACTUAL!
  base: '/Proyecto-de-programacion---grupo-5-/', 
  plugins: [react()],
})
