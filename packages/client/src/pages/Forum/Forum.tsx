import { Typography, Flex, Table, Modal, type TableProps } from 'antd';
import { PlusOutlined, CommentOutlined } from '@ant-design/icons';
import { useCallback, useState } from 'react';

import { ADD_FORUM_FORM_ID, TAddTopicFormValues, TForumItem } from './Forum.model';
import { AddTopicForm } from './ui/AddTopicForm/AddTopicForm';
import { ButtonSecondary } from 'shared/components/ButtonSecondary/ButtonSecondary';
import { generateRandomColor } from 'shared/utils/RandomColorGenerator';

import './Forum.css';
import { useNavigate } from 'react-router-dom';
import EROUTES from 'shared/RoutesEnum';

const TABLE_COLUMNS: TableProps['columns'] = [
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

function Forum() {
  const { Title } = Typography;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [topics, setTopics] = useState<TForumItem[]>([]);

  const navigate = useNavigate();

  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);

  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  const handleAddTopic = ({ title }: TAddTopicFormValues) => {
    const randomColor = generateRandomColor();

    if (title) {
      setTopics(current => [...current, { key: current.length.toString(), color: randomColor, title, comments: 0 }]);
    }
  };

  const handleTopicRedirect = useCallback(
    (record: TForumItem) => {
      return {
        onClick: () => navigate('/' + EROUTES.FORUM + '/topic/' + record.key),
      };
    },
    [navigate],
  );

  return (
    <div className="forum__container">
      <Flex justify="space-between" align="center" className="forum__container-header">
        <Title>Форум 2048</Title>
        <ButtonSecondary onClick={handleOpenModal} icon={<PlusOutlined />}>
          Добавить Топик
        </ButtonSecondary>
      </Flex>

      <Table
        dataSource={topics}
        columns={TABLE_COLUMNS}
        locale={{ emptyText: 'Топиков для обсуждения не найдено.' }}
        pagination={{ position: ['bottomCenter'], pageSize: 10 }}
        onRow={handleTopicRedirect}
        className="forum__table-wrapper"
        rowClassName="forum__table-row"
      />

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
}

export default Forum;
