import { Typography, Flex, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';

import { getTopics as getTopicsApi, createTopic } from 'shared/api/forumApi/forumApi';
import { ICreateTopic } from 'shared/api/forumApi/forumApi.interface';

import { ADD_FORUM_FORM_ID } from 'shared/constants/forum';
import { AddTopicForm } from 'features/AddForumTopic';
import { ButtonSecondary } from 'shared/components/ButtonSecondary/ButtonSecondary';
import { generateRandomColor } from 'shared/utils/RandomColorGenerator';
import { ForumTopicsTable } from 'widgets/ForumTopicsTable';

import './Forum.css';
import { addTopics, getTopics } from 'shared/store/forum/forumSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'shared/store/user/userSlice';
import { IForumTopic } from 'shared/constants/forum/types/Forum.models';

const Forum = () => {
  const { Title } = Typography;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const user = useSelector(selectUser);
  const topics = useSelector(getTopics);
  const dispatch = useDispatch();

  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);

  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  const loadTopics = useCallback(async () => {
    const response = await getTopicsApi();

    if (!response) return;

    dispatch(addTopics(response.map(topic => ({ ...topic, color: generateRandomColor() } as IForumTopic))));
  }, []);

  const handleAddTopic = async ({ title, content }: Omit<ICreateTopic, 'authorId'>) => {
    const randomColor = generateRandomColor();

    if (!user) {
      return console.error('User id is not available');
    }
    const createdTopic = await createTopic({ title, content, authorId: user?.id as number });

    if (!createdTopic) {
      return console.error('Error during adding topic');
    }

    const date = new Date(createdTopic.createdAt);

    dispatch(
      addTopics([
        {
          ...createdTopic,
          id: createdTopic.id,
          color: randomColor,
          title: createdTopic.title,
          description: createdTopic.description,
          createdAt: `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`,
          author: createdTopic.author,
          comments: [],
        },
      ]),
    );
  };

  useEffect(() => {
    loadTopics();
  });

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
