import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // Любой запрос, начинающийся с /image_proxy, будет перенаправлен
      '/image_proxy': {
        target: 'https://api-sk-mordovia.test.itlabs.top',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/image_proxy/, ''),
      },
    }
  }
})
