import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      public: path.resolve(__dirname, 'src', 'public'),
      components: path.resolve(__dirname, 'src', 'components'),
      views: path.resolve(__dirname, 'src', 'views'),
    },
  },
})
