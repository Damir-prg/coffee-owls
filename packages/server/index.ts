import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import cspMiddleware from './middlewares/csp.middleware';
import authMiddleware from './middlewares/auth.middleware';
import { createClientAndConnect } from './db';
import { dbConnect } from './init';
import { router } from './routes';

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
  await dbConnect();

  const app = express();
  app.use(cspMiddleware());
  app.use(cookieParser());
  app.use(
    cors({
      origin: ['http://localhost:3001', 'https://coffee-owls.ya-praktikum.tech'],
      credentials: true,
    }),
  );
  app.use(express.json());

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

  app.get('/set-cookie', (_, res) => {
    res.cookie('authCookie', 'eaf397ab28412203ff27c7d2c0704cddd198adc1:1721211739', {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
    });
    res.cookie('uuid', 'af069d87-c107-4c2d-b9a7-88f03df80585', {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
    });
    res.send('Куки установлены!');
  });

  app.use('/api', authMiddleware, router);

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
