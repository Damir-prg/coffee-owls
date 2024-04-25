import { Typography, Flex, Button, Table, Modal, Form, Input, type TableProps } from 'antd';
import { PlusOutlined, CommentOutlined } from '@ant-design/icons';
import { useCallback, useState } from 'react';

import { TForumItem } from './Forum.models';

import './Forum.css';

function Forum() {
  const { Title } = Typography;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [form] = Form.useForm();

  const toggleModal = useCallback(() => setIsModalOpen(current => !current), []);

  const dataSource: TForumItem[] = [];

  const columns: TableProps['columns'] = [
    {
      title: 'Топики для обсуждения',
      dataIndex: 'title',
      key: 'title',
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
      onCell: () => {
        return {
          className: 'forum__table__cell-comments',
        };
      },
    },
  ];

  return (
    <div className="forum__container">
      <Flex justify="space-between" align="center" className="forum__container-header">
        <Title>Форум 2048</Title>
        <Button type="dashed" onClick={toggleModal}>
          <PlusOutlined /> Добавить Топик
        </Button>
      </Flex>

      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ position: ['bottomCenter'] }}
        className="forum__table-wrapper"
      />

      <Modal
        title="Добавить обсуждение"
        open={isModalOpen}
        onOk={toggleModal}
        okText="Добавить"
        onCancel={toggleModal}
        footer={(_, { OkBtn }) => (
          <>
            <OkBtn />
          </>
        )}>
        <Form form={form}>
          <Form.Item name="title">
            <Input placeholder="Выберите название" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Forum;
