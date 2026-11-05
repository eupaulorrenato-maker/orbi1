import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        landing: fileURLToPath(new URL('./index.html', import.meta.url)),
        presentation: fileURLToPath(new URL('./apresentacao/index.html', import.meta.url)),
      },
    },
  },
});
