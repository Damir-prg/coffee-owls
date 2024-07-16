import axios from 'axios';
import type { Response, NextFunction } from 'express';
import { getUserById, createUser } from '../controllers/user.controller';
import type { IAuthenticatedRequest } from '../models/types';
import type { IUser } from '../models/types';

const AUTH_URL = 'https://ya-praktikum.tech/api/v2/auth/user';

const authMiddleware = async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    console.log(req);
    const cookie = req.headers['cookie'] ?? req.cookies;

    if (!cookie) {
      throw new Error('Пользователь не авторизован');
    }

    const cookieString =
      typeof cookie === 'string'
        ? cookie
        : Object.entries(cookie)
            .map(([key, value]) => `${key}=${value}`)
            .join('; ');

    const { data } = await axios.get(AUTH_URL, {
      headers: { cookie: cookieString },
    });

    if (!data) {
      res.status(403).send({ reason: 'Пользователь не найден' });
      return;
    }

    const userDB = await getUserById(data.id);

    if (!userDB) {
      let newUser: IUser;
      if (!data.display_name) {
        newUser = await createUser({ ...data, display_name: ' ' });
      } else {
        newUser = await createUser(data);
      }
      req.authUser = newUser;
    } else {
      req.authUser = userDB;
    }

    next();
  } catch (e) {
    console.error(e);
    res.status(403).send({ reason: 'Пользователь не авторизован' });
  }
};

export default authMiddleware;
