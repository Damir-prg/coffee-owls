import type { Response } from 'express';
import { Reaction } from '../models/reaction.model';
import type { IAuthenticatedRequest } from '../models/types';

export async function addReaction(req: IAuthenticatedRequest, res: Response) {
  try {
    const { reaction: selectedReaction, commentId } = req.body;

    if (!commentId || !selectedReaction) {
      res.status(400).send('Bad request');
      return;
    }

    const data = {
      reaction: selectedReaction,
      commentId: Number(commentId),
    };

    const reactionOnComment = await Reaction.findAll({
      where: {
        reaction: selectedReaction,
        commentId: commentId,
      },
    });
    const isExist = !!reactionOnComment.find(({ reaction }) => reaction === selectedReaction);
    if (isExist) {
      res.status(200).send();
      return;
    }
    const reactionModel = await Reaction.create(data);
    res.send(reactionModel);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function deleteReaction(req: IAuthenticatedRequest, res: Response) {
  try {
    const { reaction: selectedReaction, commentId } = req.body;

    if (!commentId || !selectedReaction) {
      res.status(400).send('Bad request');
      return;
    }

    /** На всякий случай сделала проверку на All */
    const reactionList = await Reaction.findAll({
      where: {
        reaction: selectedReaction,
        commentId: commentId,
      },
    });

    for (const reaction of reactionList) {
      await reaction.destroy();
    }
    res.status(200).send('deleted');
  } catch (e) {
    res.status(500).send(e);
  }
}
