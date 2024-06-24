import { Typography, Flex, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useCallback, useState } from 'react';

import { ADD_FORUM_FORM_ID, TAddTopicFormValues } from 'shared/constants/forum';
import { AddTopicForm } from 'features/AddForumTopic';
import { ButtonSecondary } from 'shared/components/ButtonSecondary/ButtonSecondary';
import { generateRandomColor } from 'shared/utils/RandomColorGenerator';
import { ForumTopicsTable } from 'widgets/ForumTopicsTable';

import './Forum.css';
import { addTopics, getTopics } from 'shared/store/forum/forumSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'shared/store/user/userSlice';

const Forum = () => {
  const { Title } = Typography;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const user = useSelector(selectUser);
  const topics = useSelector(getTopics);
  const dispatch = useDispatch();

  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);

  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  const handleAddTopic = ({ title }: TAddTopicFormValues) => {
    const randomColor = generateRandomColor();
    const date = new Date();

    dispatch(
      addTopics([
        {
          id: topics.length,
          color: randomColor,
          title,
          description: '',
          created_at: `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`,
          author: {
            username: user?.display_name || '',
            avatar: user?.avatar || '',
          },
          comments: [],
        },
      ]),
    );
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
