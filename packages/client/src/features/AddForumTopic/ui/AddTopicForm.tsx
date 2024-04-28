import { Form, Input } from 'antd';
import { ADD_FORUM_FORM_ID, TAddTopicFormValues } from 'shared/constants/forum';

import './AddTopicForm.css';

type TProps = {
  onAddTopic: (values: TAddTopicFormValues) => void;
};

export const AddTopicForm = ({ onAddTopic }: TProps) => {
  const [form] = Form.useForm();

  const handleSubmit = ({ title }: TAddTopicFormValues) => {
    if (title) {
      onAddTopic({ title });
      form.resetFields();
    }
  };

  return (
    <Form form={form} id={ADD_FORUM_FORM_ID} onFinish={handleSubmit}>
      <Form.Item name="title">
        <Input placeholder="Выберите название" className="add__topic__form-field" />
      </Form.Item>
    </Form>
  );
};
