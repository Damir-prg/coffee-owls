import express from 'express';
import { forumRouter } from './forum.router';

const router = express.Router();

router.use('', forumRouter);

export { router };
