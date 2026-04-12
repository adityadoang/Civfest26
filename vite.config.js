import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        events: path.resolve(__dirname, 'events.html'),
        pastEvents: path.resolve(__dirname, 'past-events.html'),
        register: path.resolve(__dirname, 'register.html')
      }
    }
  }
});
