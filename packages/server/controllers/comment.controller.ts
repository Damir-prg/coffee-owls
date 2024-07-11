import { Topic } from '../models/topic.model';
import { Comment } from '../models/comment.model';
import { User } from '../models/user.model';
import { mockUser } from '../mocks';

import type { Request, Response } from 'express';
import { Reaction } from '../models/reaction.model';

export async function createComment(req: Request, res: Response) {
  try {
    const { topicId } = req.params;
    const { text } = req.body;

    if (!topicId || !text) {
      res.status(400).send('Bad request');
      return;
    }

    const topic = await Topic.findByPk(topicId);

    if (!topic) {
      res.status(404).send('Not found Topic');
      return;
    }

    const data = {
      text,
      topicId: Number(topicId),
      authorId: mockUser.id,
    };

    const comment = await Comment.create(data);

    const commentWithAuthor = await Comment.findByPk(comment.id, {
      attributes: ['id', 'text', 'createdAt', 'updatedAt'],
      include: [
        {
          model: User,
          attributes: ['id', 'first_name', 'second_name', 'display_name', 'avatar'],
        },
        {
          model: Reaction,
        },
      ],
    });
    res.send(commentWithAuthor);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function updateComment(req: Request, res: Response) {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    if (!commentId || !text) {
      res.status(400).send('Bad request');
      return;
    }

    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      res.status(404).send('Not found Comment');
      return;
    }

    if (comment.authorId !== mockUser.id) {
      res.status(403).send('Forbidden');
      return;
    }

    await comment.update({ text });

    res.status(200).send();
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function deleteComment(req: Request, res: Response) {
  try {
    const { commentId } = req.params;

    if (!commentId) {
      res.status(400).send('Bad request');
      return;
    }

    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      res.status(404).send('Not found Comment');
      return;
    }

    if (comment.authorId !== mockUser.id) {
      res.status(403).send('Forbidden');
      return;
    }

    await comment.destroy();

    res.status(200).send();
  } catch (e) {
    res.status(500).send(e);
  }
}
