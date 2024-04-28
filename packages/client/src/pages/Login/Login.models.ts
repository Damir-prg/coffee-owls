import { validationRules, requiredField } from 'shared/ValidationRules';

export type TLoginFormFields = {
  login: string;
  password: string;
};

export const loginFormFields = [
  {
    name: 'login',
    placeholder: 'Логин',
    type: 'string',
    rules: [requiredField, validationRules.login],
  },
  {
    name: 'password',
    placeholder: 'Пароль',
    type: 'password',
    rules: [requiredField, validationRules.password],
  },
];
