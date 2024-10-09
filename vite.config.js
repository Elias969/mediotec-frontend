import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permite que o Vite escute em todas as interfaces de rede
    port: 5173, // Ou a porta que você está usando
  },

})
