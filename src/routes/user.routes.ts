import express from 'express';

import {createUserSchema} from './../schemas/user.schema'
import validate from '../middlewares/validateResource';
import { createUserHandler } from '../controllers/user.controller';

const router = express.Router();


router.route('/').post(validate(createUserSchema), createUserHandler);

export default router;
