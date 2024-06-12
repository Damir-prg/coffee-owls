import { Typography, Flex, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useCallback, useState } from 'react';

import { ADD_FORUM_FORM_ID, TAddTopicFormValues, TForumItem } from 'shared/constants/forum';
import { AddTopicForm } from 'features/AddForumTopic';
import { ButtonSecondary } from 'shared/components/ButtonSecondary/ButtonSecondary';
import { generateRandomColor } from 'shared/utils/RandomColorGenerator';
import { ForumTopicsTable } from 'widgets/ForumTopicsTable';

import './Forum.css';

const Forum = () => {
  const { Title } = Typography;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [topics, setTopics] = useState<TForumItem[]>([]);

  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);

  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  const handleAddTopic = ({ title }: TAddTopicFormValues) => {
    const randomColor = generateRandomColor();

    setTopics(current => [...current, { key: current.length.toString(), color: randomColor, title, comments: 0 }]);
  };

  return (
    <div className="forum__container">
      <Flex justify="space-between" align="center" className="forum__container-header">
        <Title>Форум 2048</Title>
        <ButtonSecondary onClick={handleOpenModal} icon={<PlusOutlined />}>
          Добавить Топик
        </ButtonSecondary>
      </Flex>

      <ForumTopicsTable topics={topics} />

      <Modal
        title="Добавить обсуждение"
        open={isModalOpen}
        onOk={handleCloseModal}
        okButtonProps={{ form: ADD_FORUM_FORM_ID, htmlType: 'submit' }}
        okText="Добавить"
        className="add__topic-modal"
        onCancel={handleCloseModal}
        footer={(_, { OkBtn }) => (
          <>
            <OkBtn />
          </>
        )}
        centered>
        <AddTopicForm onAddTopic={handleAddTopic} />
      </Modal>
    </div>
  );
};

export default Forum;
