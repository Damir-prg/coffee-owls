// Временный мок до создания API

import { generateRandomColor } from 'shared/utils/RandomColorGenerator';
import { EREACTION } from 'features/Reaction/types/AddReaction.types';
import { IForumTopic } from 'shared/constants/forum/types/Forum.models';

const getMockUser = (id: number): IForumTopic['author'] => {
  return {
    avatar: '',
    id: id,
    display_name: `user${id}`,
    email: `user${id}`,
    first_name: `user${id}`,
    login: `user${id}`,
    phone: `user${id}`,
    second_name: `user${id}`,
  };
};

export const TEST_TOPICS: Array<IForumTopic> = [
  {
    id: 0,
    title: 'Стратегия',
    description: 'Описание стратегий',
    color: generateRandomColor(),
    author: getMockUser(1),
    createdAt: '12.02.2021',
    comments: [],
    commentsCount: '0',
  },
  {
    id: -2,
    title: 'Стратегия',
    description: 'Описание стратегий',
    color: generateRandomColor(),
    author: getMockUser(2),
    createdAt: '12.02.2021',
    commentsCount: '0',
    comments: [
      {
        id: 0,
        author: getMockUser(3),
        createdAt: '12.02.2021',
        reactions: [
          {
            commentId: -2,
            id: 0,
            reaction: EREACTION.LOVE,
          },
          {
            commentId: -2,
            id: 1,
            reaction: EREACTION.FIRE,
          },
          {
            commentId: -2,
            id: 2,
            reaction: EREACTION.EYES,
          },
        ],
        text: 'Hello, Test',
        updatedAt: '12.02.2021',
      },
      {
        id: 1,
        author: getMockUser(3),
        createdAt: '12.02.2021',
        reactions: [],
        text: 'Hello, Test 2',
        updatedAt: '12.02.2021',
      },
      {
        id: 2,
        author: getMockUser(4),
        createdAt: '12.02.2021',
        reactions: [
          {
            commentId: 2,
            id: 0,
            reaction: EREACTION.LOVE,
          },
          {
            commentId: 2,
            id: 1,
            reaction: EREACTION.FIRE,
          },
          {
            commentId: 2,
            id: 2,
            reaction: EREACTION.EYES,
          },
        ],
        text: 'Hello, Test 3',
        updatedAt: '12.02.2021',
      },
    ],
  },
];
