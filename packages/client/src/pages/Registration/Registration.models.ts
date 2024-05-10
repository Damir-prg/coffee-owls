import { validationRules, requiredField, validatePasswordRepeat } from 'shared/lib/ValidationRules';

export type TRegistrationFormFields = {
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
  login: string;
  password: string;
};

export const registrationFormFields = [
  {
    name: 'first_name',
    placeholder: 'Имя',
    type: 'string',
    rules: [requiredField, validationRules.firstName],
  },
  {
    name: 'second_name',
    placeholder: 'Фамилия',
    type: 'string',
    rules: [requiredField, validationRules.secondName],
  },
  {
    name: 'email',
    placeholder: 'Почта',
    type: 'string',
    rules: [requiredField, validationRules.email],
  },
  {
    name: 'phone',
    placeholder: 'Телефон',
    type: 'string',
    rules: [requiredField, validationRules.phone],
  },
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
  {
    name: 'password-repeat',
    placeholder: 'Повторите пароль',
    type: 'password',
    dependencies: ['password'],
    rules: [requiredField, validatePasswordRepeat],
  },
];
