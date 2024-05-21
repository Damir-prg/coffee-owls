import { validatePasswordUpdate, validationRules } from 'shared/lib/ValidationRules';
import { IUser } from 'shared/api/authApi/auth.interface';

export type TUserFormData = Record<keyof Omit<IUser, 'id' | 'avatar'> | 'oldPassword' | 'newPassword', string>;
export const USER_EDIT_FIELDS = [
  {
    name: 'second_name',
    placeholder: 'Фамилия',
    type: 'string',
    rules: [validationRules.secondName],
  },
  {
    name: 'first_name',
    placeholder: 'Имя',
    type: 'string',
    rules: [validationRules.firstName],
  },
  {
    name: 'email',
    placeholder: 'Почта',
    type: 'email',
    rules: [validationRules.email],
  },
  {
    name: 'login',
    placeholder: 'Никнейм',
    type: 'string',
    rules: [validationRules.login],
  },
  {
    name: 'display_name',
    placeholder: 'Отображаемое имя',
    type: 'string',
    rules: [validationRules.firstName],
  },
  {
    name: 'phone',
    placeholder: 'Телефон',
    type: 'string',
    rules: [validationRules.phone],
  },
  {
    name: 'oldPassword',
    placeholder: 'Старый пароль',
    type: 'password',
    rules: [validationRules.password],
  },
  {
    name: 'newPassword',
    placeholder: 'Новый пароль',
    type: 'password',
    dependencies: ['oldPassword'],
    rules: [validationRules.password, validatePasswordUpdate],
  },
];

export const USER_EDIT_FORM = 'user-edit-form';
