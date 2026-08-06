import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';

// Custom Vite plugin to handle real-time frontend file logging during dev
function devFileLoggerPlugin() {
  return {
    name: 'dev-file-logger',
    configureServer(server: any) {
      server.middlewares.use('/dev-log', (req: any, res: any) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const logsDir = path.resolve(__dirname, 'logs');
              if (!fs.existsSync(logsDir)) {
                fs.mkdirSync(logsDir, { recursive: true });
              }
              const logFilePath = path.join(logsDir, 'frontend.log');
              const { entry } = JSON.parse(body);
              if (entry) {
                let dataStr = '';
                if (entry.data !== undefined) {
                  try {
                    dataStr = ` | Data: ${JSON.stringify(entry.data)}`;
                  } catch {
                    dataStr = ` | Data: [Unserializable]`;
                  }
                }
                const line = `[${entry.timestamp}] [${entry.level.padEnd(5)}] [${entry.module}] ${entry.message}${dataStr}\n`;
                fs.appendFileSync(logFilePath, line, 'utf-8');
              }
              res.statusCode = 200;
              res.setHeader('Content-Type', 'text/plain');
              res.end('OK');
            } catch (err) {
              res.statusCode = 500;
              res.end(String(err));
            }
          });
        } else {
          res.statusCode = 405;
          res.end('Method Not Allowed');
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [devFileLoggerPlugin(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

