import { CommentOutlined } from '@ant-design/icons';
import { Flex, Table, TableProps } from 'antd';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import EROUTES from 'shared/RoutesEnum';
import { TForumItem } from 'shared/constants/forum';

import './ForumTopicsTable.css';

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

type TProps = {
  topics: TForumItem[];
};

export function ForumTopicsTable({ topics }: TProps) {
  const navigate = useNavigate();

  const handleTopicRedirect = useCallback(
    (record: TForumItem) => {
      return {
        onClick: () => navigate('/' + EROUTES.FORUM + '/topic/' + record.key),
      };
    },
    [navigate],
  );

  return (
    <Table
      dataSource={topics}
      columns={TABLE_COLUMNS}
      locale={{ emptyText: 'Топиков для обсуждения не найдено.' }}
      pagination={{ position: ['bottomCenter'], pageSize: 10 }}
      onRow={handleTopicRedirect}
      className="forum__table-wrapper"
      rowClassName="forum__table-row"
    />
  );
}
