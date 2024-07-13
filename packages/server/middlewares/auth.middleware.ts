import type { Request, Response, NextFunction } from 'express';

const AUTH_URL = 'https://ya-praktikum.tech/api/v2/auth/user';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cookie = req.headers.cookie;

    if (!cookie) {
      throw new Error('Нет куки');
    }

    const response = await fetch(AUTH_URL, { headers: { cookie } });

    if (response.status !== 200) {
      throw new Error('Пользователь не авторизован');
    }

    /*
    req.user = await response.json();

    if (!user || !user.id) {
      res.status(403).send({ reason: 'Пользователь не найден' });
      return;
    }

    const userDB = await getUserById(user.id);
    if (!userDB) {
      const newUser = await createUser(user);
      req.user = newUser;
    } else {
      req.user = userDB;
    }

    */

    next();
  } catch (e) {
    console.error(e);
    res.status(403).send({ reason: 'Пользователь не авторизован' });
  }
};

export default authMiddleware;
