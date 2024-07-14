import { User } from '../models/user.model';

import type { IAuthenticatedRequest } from '../models/types';
import type { Response } from 'express';
import type { IUser } from '../models/types';

export async function createUser(user: IUser) {
  return User.create(user);
}

export async function updateUser(id: number, data: IUser) {
  return User.update(data, { where: { id } });
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
