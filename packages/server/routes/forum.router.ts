import express from 'express';
import { getUser } from '../controllers/user.controller';
import { getTopics, createTopic, getTopicDetail } from '../controllers/topic.controller';
import { createComment, updateComment, deleteComment } from '../controllers/comment.controller';
import { addReaction, deleteReaction } from '../controllers/reaction.controller';

export const forumRouter = express.Router();

forumRouter.get('/user', getUser);

forumRouter.get('/topics', getTopics);
forumRouter.post('/topics', createTopic);
forumRouter.get('/topics/:topicId', getTopicDetail);

forumRouter.post('/topics/:topicId/comments', createComment);
forumRouter.patch('/comments/:commentId', updateComment);
forumRouter.delete('/comments/:commentId', deleteComment);

forumRouter.post('/reaction', addReaction);
forumRouter.delete('/reaction', deleteReaction);
