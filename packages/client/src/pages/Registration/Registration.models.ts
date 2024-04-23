import { RuleRender } from 'antd/es/form';
import { requiredFieldRule } from 'shared/components/PageForm/PageForm.model';

const validatePassword: RuleRender = ({ getFieldValue }) => ({
  validator(_, value) {
    if (!value || getFieldValue('password') === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Пароли не совпадают!'));
  },
});

export type TRegistrationFormFields = {
  firstName: string;
  secondName: string;
  mail: string;
  phone: string;
  login: string;
  password: string;
};

export const registrationFormFields = [
  {
    name: 'first_name',
    placeholder: 'Имя',
    type: 'string',
    rules: [
      requiredFieldRule,
      {
        pattern: /^[A-ZА-ЯЁ][a-zA-Zа-яё-]*$/,
        message: 'Неправильный формат имени!',
      },
    ],
  },
  {
    name: 'second_name',
    placeholder: 'Фамилия',
    type: 'string',
    rules: [
      requiredFieldRule,
      {
        pattern: /^[A-ZА-ЯЁ][a-zA-Zа-яё-]*$/,
        message: 'Неправильный формат фамилии!',
      },
    ],
  },
  {
    name: 'email',
    placeholder: 'Почта',
    type: 'string',
    rules: [
      requiredFieldRule,
      {
        pattern: /^(?=.*[@])[a-zA-Z0-9_-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)+$/,
        message: 'Неправильный формат почты!',
      },
    ],
  },
  {
    name: 'phone',
    placeholder: 'Телефон',
    type: 'string',
    rules: [
      requiredFieldRule,
      {
        pattern: /^\+?\d{10,15}$/,
        message: 'Неправильный формат телефона!',
      },
    ],
  },
  {
    name: 'login',
    placeholder: 'Логин',
    type: 'string',
    rules: [
      requiredFieldRule,
      {
        pattern: /^(?=[a-zA-Z0-9_-]{3,20}$)(?![0-9]+$)[a-zA-Z0-9_-]+$/,
        message: 'Неправильный формат логина!',
      },
    ],
  },
  {
    name: 'password',
    placeholder: 'Пароль',
    type: 'password',
    rules: [
      requiredFieldRule,
      {
        pattern: /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9_-]{8,40}$/,
        message: 'Неправильный формат пароля!',
      },
    ],
  },
  {
    name: 'password-repeat',
    placeholder: 'Повторите пароль',
    type: 'password',
    dependencies: ['password'],
    rules: [requiredFieldRule, validatePassword],
  },
];
