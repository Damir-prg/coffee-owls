import { User } from '../models/user.model';

import type { IUser } from '../models/types';

export async function createUser(user: IUser) {
  return User.create(user);
}

export async function updateUser(id: number, data: IUser) {
  return User.update(data, { where: { id } });
}

export async function getUserById(id: number) {
  return User.findByPk(id);
}
