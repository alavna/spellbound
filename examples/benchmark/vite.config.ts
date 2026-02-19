import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@spellbound/core', '@spellbound/dict-en-us'],
    exclude: ['@huggingface/transformers'],
  },
  worker: {
    format: 'es',
  },
});
