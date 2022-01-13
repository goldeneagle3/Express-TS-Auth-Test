import express from 'express';

import { createSessionSchema } from './../schemas/session.schema';
import validate from '../middlewares/validateResource';
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionHandler,
} from '../controllers/session.controller';
import requireUser from '../middlewares/requireUser';

const router = express.Router();

router
  .route('/')
  .post(validate(createSessionSchema), createUserSessionHandler)
  .get(requireUser, getUserSessionHandler)
  .delete(requireUser, deleteSessionHandler);

export default router;
