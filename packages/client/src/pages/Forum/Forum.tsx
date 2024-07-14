import { Typography, Flex, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';

import { getTopics as getTopicsApi, createTopic } from 'shared/api/forumApi/forumApi';
import { ITopicInfo } from 'shared/api/forumApi/forumApi.interface';

import { ADD_FORUM_FORM_ID } from 'shared/constants/forum';
import { AddTopicForm } from 'features/AddForumTopic';
import { ButtonSecondary } from 'shared/components/ButtonSecondary/ButtonSecondary';
import { ForumTopicsTable } from 'widgets/ForumTopicsTable';

import './Forum.css';
import { addTopics, clearTopics, getTopics } from 'shared/store/forum/forumSlice';
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

  const loadTopics = useCallback(async () => {
    const response = await getTopicsApi();

    if (!response) return;

    dispatch(addTopics(response));
  }, []);

  const handleAddTopic = async ({ title, description }: ITopicInfo) => {
    if (!user) {
      return console.error('User id is not available');
    }
    const createdTopic = await createTopic({ title, description });

    if (!createdTopic?.id) {
      return console.error('Error during load created topic');
    }

    dispatch(
      addTopics([
        {
          ...createdTopic,
          commentsCount: '0',
        },
      ]),
    );
  };

  useEffect(() => {
    void loadTopics();
    return () => {
      dispatch(clearTopics());
    };
  }, []);

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
