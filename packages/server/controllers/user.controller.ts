import { User } from '../models/user.model';

import type { IAuthenticatedRequest } from '../models/types';
import type { Response } from 'express';
import type { IUser } from '../models/types';

export async function createUser(user: IUser) {
  return User.create(user);
}

export async function updateUser(req: IAuthenticatedRequest, res: Response) {
  try {
    const user = req.body;

    if (!user) {
      res.status(400).send('Bad request');
      return;
    }

    if (req.authUser && req.authUser.id) {
      await User.update(user, { where: { id: req.authUser.id } });
      res.status(200).send('Данные успешно обновлены');
    } else {
      res.status(400).send('Ошибка при авторизации пользователя');
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function getUser(req: IAuthenticatedRequest, res: Response) {
  try {
    if (req.authUser && req.authUser.id) {
      res.send(req.authUser);
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function getUserById(id: number) {
  return User.findByPk(id);
}
