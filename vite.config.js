import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',  // Ensures assets load from root
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',  // No .jsx in output
      }
    }
  }
});