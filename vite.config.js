import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { seoStaticPages } from './vite.seoPlugin.js'

export default defineConfig({
  plugins: [react(), seoStaticPages()],
  appType: 'spa',
})
