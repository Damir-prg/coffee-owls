import { IUser } from 'shared/api/authApi/auth.interface';

export type TInfoListKey = keyof Omit<IUser, 'id' | 'avatar'>;
export const InfoListItems: Record<TInfoListKey, string> = {
  second_name: 'Фамилия',
  first_name: 'Имя',
  display_name: 'Отображаемое имя',
  email: 'Почта',
  phone: 'Телефон',
  login: 'Никнeйм',
};
