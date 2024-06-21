// Временный мок до создания API

import { generateRandomColor } from 'shared/utils/RandomColorGenerator';
import { EREACTION } from 'features/Reaction/types/AddReaction.types';
import { IForumTopic } from 'shared/constants/forum/types/Forum.models';

export const TEST_TOPICS: Array<IForumTopic> = [
  {
    id: 0,
    title: 'Стратегия',
    description: 'Описание стратегий',
    color: generateRandomColor(),
    author: {
      username: 'user01',
      avatar: '',
    },
    created_at: '12.02.2021',
    comments: [],
  },
  {
    id: 1,
    title: 'Новые Стратегии игры',
    description: 'Опишите свои стратегии игры...',
    color: generateRandomColor(),
    author: {
      username: 'user01',
      avatar: '',
    },
    created_at: '12.02.2021',
    comments: [
      {
        id: 0,
        content: 'Hello, Test',
        author: {
          username: 'user02',
          avatar: '',
        },
        created_at: '12.02.2024',
        reactions: [],
      },
      {
        id: 1,
        content: 'Hello, Test',
        author: {
          username: 'burbur',
          avatar: '',
        },
        created_at: '13.02.2024',
        reactions: [],
      },
      {
        id: 2,
        content:
          'Hello, Test.  A simple popup menu to provide extra information or operations. A simple popup menu to provide extra information or operations. A simple popup menu to provide extra information or operations.A simple popup menu to provide extra information or operations.',
        author: {
          username: 'name',
          avatar: '',
        },
        created_at: '16.02.2024',
        reactions: [EREACTION.LOVE, EREACTION.FIRE],
      },
    ],
  },
];
