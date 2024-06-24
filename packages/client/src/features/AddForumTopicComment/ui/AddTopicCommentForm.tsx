import { Flex, Form, Input } from 'antd';
import { ButtonSecondary } from 'shared/components/ButtonSecondary/ButtonSecondary';

import './AddTopicCommentForm.css';

type TProps = {
  onAddComment: (message: string) => void;
};

export function AddTopicCommentForm({ onAddComment }: TProps) {
  const [form] = Form.useForm();

  const handleSubmit = ({ message }: { message: string }) => {
    if (message) {
      onAddComment(message);
      form.resetFields();
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} className="topic__comment-form">
      <Form.Item name="message">
        <Input.TextArea placeholder="Ваш комментарий" className="topic__comment-input" />
      </Form.Item>
      <Flex justify="flex-end">
        <ButtonSecondary htmlType="submit">Добавить комментарий</ButtonSecondary>
      </Flex>
    </Form>
  );
}
