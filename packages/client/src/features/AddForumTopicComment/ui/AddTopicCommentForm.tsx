import { Flex, Form, Input } from 'antd';
import { TTopicComment } from 'shared/constants/forum';
import { ButtonSecondary } from 'shared/components/ButtonSecondary/ButtonSecondary';

import './AddTopicCommentForm.css';

type TProps = {
  onAddComment: (coment: TTopicComment) => void;
};

export function AddTopicCommentForm({ onAddComment }: TProps) {
  const [form] = Form.useForm();

  const handleSubmit = ({ message }: { message: string }) => {
    if (message) {
      onAddComment({
        id: 1,
        content: message,
        author: {
          username: 'user1',
          avatar: '',
        },
        created_at: '10.02.2021',
      });
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
