// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ...

export default defineConfig({
  base: repoName, 
  plugins: [
    react(), // <-- QUEDA ASÍ (sin el include: '**/*.{...}')
  ],
  // ...
})