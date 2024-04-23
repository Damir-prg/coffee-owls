import type { FormRule } from 'antd';

export const requiredFieldRule = {
  required: true,
  message: 'Поле не может быть пустым!',
};

export type TFieldType = {
  name: string;
  placeholder: string;
  type: string;
  rules?: FormRule[];
  dependencies?: string[];
};

export interface IPageFormProps {
  formName: string;
  title: string;
  fields: TFieldType[];
  link?: { text: string; path: string };
}
