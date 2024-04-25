import { Form, Input } from 'antd';
import { ADD_FORUM_FORM_ID, TAddTopicFormValues } from 'pages/Forum/Forum.model';

import './AddTopicForm.css';

type TProps = {
  onAddTopic: (values: TAddTopicFormValues) => void;
};

export const AddTopicForm = ({ onAddTopic }: TProps) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: TAddTopicFormValues) => {
    onAddTopic(values);
    form.resetFields();
  };

  return (
    <Form form={form} id={ADD_FORUM_FORM_ID} onFinish={handleSubmit}>
      <Form.Item name="title">
        <Input placeholder="Выберите название" className="add__topic__form-field" />
      </Form.Item>
    </Form>
  );
};
