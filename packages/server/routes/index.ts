import express from 'express';
import { forumRouter } from './forum.router';
import { updateUser } from '../controllers/user.controller';

const router = express.Router();

router.use('', forumRouter);
router.patch('/user/update', updateUser);

export { router };
