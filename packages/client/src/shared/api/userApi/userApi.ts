import api from '../api';
import { IChangePasswordData } from 'shared/api/userApi/user.interface';
import { IUser } from 'shared/api/authApi/auth.interface';
const userUrl = '/user';

export const changePassword = (data: IChangePasswordData): Promise<null> => {
  return api.put(`${userUrl}/password`, { data });
};

export const changeAvatar = (data: FormData): Promise<IUser | null> => {
  return api.put(`${userUrl}/profile/avatar`, { data });
};
