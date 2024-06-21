import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createClientAndConnect } from './db';

dotenv.config();

import express, { Request as ExpressRequest } from 'express';
import path from 'path';

import fs from 'fs/promises';
import { createServer as createViteServer, ViteDevServer } from 'vite';
import serialize from 'serialize-javascript';

const port = Number(process.env.SERVER_PORT) || 3001;

const isDev = process.env.NODE_ENV === 'development';
/**
 * dirname dev coffee-owls/packages/server
 * dirname prod coffee-owls/packages/server/dist
 * */
const clientPath = path.join(__dirname, `${isDev ? '../' : '../../'}`, 'client');

async function createServer() {
  await createClientAndConnect();

  const app = express();
  app.use(cookieParser());
  app.use(cors());

  let vite: ViteDevServer | undefined;
  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(clientPath, 'dist/client'), { index: false }));
  }

  app.get('/user', (_, res) => {
    res.json({
      id: 12345,
      first_name: 'Coffee',
      second_name: 'Owls',
      display_name: 'Coffee Owls',
      login: 'CoffeeOwls',
      email: 'coffee-owls@yandex.ru',
      phone: '',
      avatar: '',
    });
  });

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // Создаём переменные
      let render: (req: ExpressRequest) => Promise<{ html: string; initialState: unknown; styleTags: string }>;
      let template: string;

      if (vite) {
        template = await fs.readFile(path.resolve(clientPath, 'index.html'), 'utf-8');

        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule(path.join(clientPath, 'src/entry-server.tsx'))).render;
      } else {
        template = await fs.readFile(path.join(clientPath, 'dist/client/index.html'), 'utf-8');

        // Получаем путь до сбилдженого модуля клиента, чтобы не тащить средства сборки клиента на сервер
        const pathToServer = path.join(clientPath, 'dist/server/entry-server.cjs');

        render = (await import(pathToServer)).render;
      }

      const { html: appHtml, initialState, styleTags } = await render(req);
      const html = template
        .replace('<!--ssr-styles-->', `<style>${styleTags}</style>`)
        .replace('<!--ssr-outlet-->', appHtml)
        .replace(
          '<!--ssr-initial-state-->',
          `<script>window.APP_INITIAL_STATE = ${serialize(initialState, {
            isJSON: true,
          })}</script>`,
        );
      // Завершаем запрос и отдаём HTML-страницу
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (vite) {
        vite.ssrFixStacktrace(e as Error);
      }
      next(e);
    }
  });

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

createServer();
