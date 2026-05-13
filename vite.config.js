import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],

  // Modo librería: empaqueta como módulo NPM reutilizable
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.js'),
      name: 'SmartlogixFrontend',
      fileName: (format) => `smartlogix-frontend.${format}.js`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      // React no se incluye en el bundle; el consumidor lo provee
      external: ['react', 'react-dom', 'react-router-dom', 'axios'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  },

  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      threshold: { lines: 60 }
    }
  }
})
