import type { FormRule } from 'antd';

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
  button: {
    type: 'primary' | 'default';
    text: string;
  };
  formError?: {
    isShow: boolean;
    text: string;
  };
  link?: {
    text: string;
    path: string;
  };
  onSubmit: (formData: Record<string, string>) => void;
}
