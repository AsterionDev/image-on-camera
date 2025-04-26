import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [preact()],
  server: {
    host: true,      // para exponer en tu IP local
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'certs/127.0.0.1+2-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'certs/127.0.0.1+2.pem')),
    },
  },
});

