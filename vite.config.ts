import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "ownership-economies-search", // This is the directory name of the repository
  build: {
    outDir: "docs"
  }
})
