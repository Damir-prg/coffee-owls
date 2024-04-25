import { Typography, Flex, Table, Modal, type TableProps } from 'antd';
import { PlusOutlined, CommentOutlined } from '@ant-design/icons';
import { useCallback, useState } from 'react';

import { ADD_FORUM_FORM_ID, TAddTopicFormValues, TForumItem } from './Forum.model';
import { AddTopicForm } from './ui/AddTopicForm/AddTopicForm';
import { ButtonSecondary } from 'shared/components/ButtonSecondary/ButtonSecondary';

import './Forum.css';

function Forum() {
  const { Title } = Typography;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [topics, setTopics] = useState<TForumItem[]>([]);

  const toggleModal = useCallback(() => setIsModalOpen(current => !current), []);

  const handleAddTopic = ({ title }: TAddTopicFormValues) => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

    setTopics(current => [...current, { key: current.length.toString(), color: randomColor, title, comments: 0 }]);
  };

  const columns: TableProps['columns'] = [
    {
      title: 'Топики для обсуждения',
      dataIndex: 'title',
      key: 'title',
      className: 'forum__table__cell-title',
      render: (text, record: TForumItem) => (
        <Flex justify="flex-start" gap={20} align="center">
          <div className="forum__table__cell-color" style={{ backgroundColor: record.color }} /> {text}
        </Flex>
      ),
      onCell: () => {
        return {
          className: 'forum__table__cell-title',
        };
      },
    },
    {
      title: <CommentOutlined />,
      dataIndex: 'comments',
      key: 'comments',
      align: 'center',
      width: 100,
      render: comments => <div className="forum__table__cell-comments">{comments} ответов</div>,
    },
  ];

  return (
    <div className="forum__container">
      <Flex justify="space-between" align="center" className="forum__container-header">
        <Title>Форум 2048</Title>
        <ButtonSecondary onClick={toggleModal}>
          <PlusOutlined /> Добавить Топик
        </ButtonSecondary>
      </Flex>

      <Table
        dataSource={topics}
        columns={columns}
        locale={{ emptyText: 'Топиков для обсуждения не найдено.' }}
        pagination={{ position: ['bottomCenter'], pageSize: 10 }}
        className="forum__table-wrapper"
      />

      <Modal
        title="Добавить обсуждение"
        open={isModalOpen}
        onOk={toggleModal}
        okButtonProps={{ form: ADD_FORUM_FORM_ID, htmlType: 'submit' }}
        okText="Добавить"
        className="add__topic-modal"
        onCancel={toggleModal}
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
}

export default Forum;
