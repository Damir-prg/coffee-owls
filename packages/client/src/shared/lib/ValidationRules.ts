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
    message: 'Неправильный формат имени!',
  },
  secondName: {
    pattern: VALIDATION_PATTERNS.SECOND_NAME,
    message: 'Неправильный формат фамилии!',
  },
  email: {
    pattern: VALIDATION_PATTERNS.EMAIL,
    message: 'Неправильный формат почты!',
  },
  phone: {
    pattern: VALIDATION_PATTERNS.PHONE,
    message: 'Неправильный формат телефона!',
  },
  login: {
    pattern: VALIDATION_PATTERNS.LOGIN,
    message: 'Неправильный формат логина!',
  },
  password: {
    pattern: VALIDATION_PATTERNS.PASSWORD,
    message: 'Неправильный формат пароля!',
  },
};
