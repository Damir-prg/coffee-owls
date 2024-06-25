import { Form, Input } from 'antd';
import { ADD_FORUM_FORM_ID } from 'shared/constants/forum';

import './AddTopicForm.css';
import { ICreateTopic } from 'shared/api/forumApi/forumApi.interface';

type TProps = {
  onAddTopic: (values: Omit<ICreateTopic, 'authorId'>) => void;
};

export const AddTopicForm = ({ onAddTopic }: TProps) => {
  const [form] = Form.useForm();

  const handleSubmit = ({ title, description }: Omit<ICreateTopic, 'authorId'>) => {
    if (title) {
      onAddTopic({ title, description });
      form.resetFields();
    }
  };

  return (
    <Form form={form} id={ADD_FORUM_FORM_ID} onFinish={handleSubmit}>
      <Form.Item name="title">
        <Input placeholder="Выберите название" className="add__topic__form-field" />
      </Form.Item>
      <Form.Item name="description">
        <Input placeholder="Выберите описание" className="add__topic__form-field" />
      </Form.Item>
    </Form>
  );
};
