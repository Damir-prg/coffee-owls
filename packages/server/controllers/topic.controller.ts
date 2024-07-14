import { Sequelize } from 'sequelize';
import { Topic } from '../models/topic.model';
import { User } from '../models/user.model';
import { Comment } from '../models/comment.model';
import type { IAuthenticatedRequest } from '../models/types';
import type { Response } from 'express';
import { Reaction } from '../models/reaction.model';

export async function getTopics(_: IAuthenticatedRequest, res: Response) {
  try {
    const topics = await Topic.findAll({
      attributes: [
        'id',
        'title',
        'description',
        [Sequelize.fn('COUNT', Sequelize.col('comments.id')), 'commentsCount'],
      ],
      include: [
        {
          model: Comment,
          attributes: [],
        },
      ],
      group: ['Topic.id'],
    });

    // TODO вытащить дату и пользователя
    const topicWithCommentsCount = topics.map(topic => ({
      id: topic.id,
      title: topic.title,
      description: topic.description,
      commentsCount: topic.get('commentsCount'),
    }));
    res.send(topicWithCommentsCount);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function createTopic(req: IAuthenticatedRequest, res: Response) {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      res.status(400).send('Bad request');
      return;
    }

    if (req.authUser && req.authUser.id) {
      const data = {
        title,
        description,
        authorId: req.authUser.id,
      };
      const topic = await Topic.create(data);
      res.send(topic);
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function getTopicDetail(req: IAuthenticatedRequest, res: Response) {
  try {
    const { topicId } = req.params;

    if (!topicId) {
      res.status(400).send('Bad request');
      return;
    }

    const topic = await Topic.findByPk(topicId, {
      attributes: ['id', 'title', 'description', 'createdAt', 'updatedAt'],
      include: [
        {
          model: User,
          attributes: ['id', 'first_name', 'second_name', 'display_name', 'avatar'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'first_name', 'second_name', 'display_name', 'avatar'],
            },
            {
              model: Reaction,
            },
          ],
        },
      ],
    });

    if (!topic) {
      res.status(404).send('Not found');
      return;
    }
    res.send(topic);
  } catch (e) {
    res.status(500).send(e);
  }
}
