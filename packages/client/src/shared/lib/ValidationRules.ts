import { Rule, RuleRender } from 'antd/es/form';
import { VALIDATION_PATTERNS } from './ValidationPatterns';

export const requiredField: Rule = {
  required: true,
  message: 'Поле не может быть пустым!',
};

export const validatePasswordRepeat: RuleRender = ({ getFieldValue }) => ({
  validator(_, value) {
    if (!value || getFieldValue('password') === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Пароли не совпадают!'));
  },
});

export const validatePasswordUpdate: RuleRender = ({ getFieldValue }) => ({
  validator(_, value) {
    if (!value) {
      if (getFieldValue('oldPassword')) {
        return Promise.reject(new Error('Необходимо заполнить новый пароль!'));
      } else {
        return Promise.resolve();
      }
    }
    if (getFieldValue('oldPassword') !== value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Пароли совпадают!'));
  },
});

export const validationRules = {
  firstName: {
    pattern: VALIDATION_PATTERNS.FIRST_NAME,
    message: 'Первая буква должна быть заглавной, без цифр и символов',
  },
  secondName: {
    pattern: VALIDATION_PATTERNS.SECOND_NAME,
    message: 'Первая буква должна быть заглавной, без цифр и символов',
  },
  email: {
    pattern: VALIDATION_PATTERNS.EMAIL,
    message: 'Неправильный формат электронной почты',
  },
  phone: {
    pattern: VALIDATION_PATTERNS.PHONE,
    message: 'Должен состоять из цифр от 10 до 15 символов',
  },
  login: {
    pattern: VALIDATION_PATTERNS.LOGIN,
    message: 'От 3 до 20 символов, латиница, может содержать цифры',
  },
  password: {
    pattern: VALIDATION_PATTERNS.PASSWORD,
    message: 'От 8 до 40 символов, обязательна одна заглавная буква и цифра',
  },
};
