import { Request, Response } from 'express';

import { CreateUserInput } from '../schemas/user.schema';
import { createUser } from '../services/user.service';
import log from '../utils/logger';

// eslint-disable-next-line @typescript-eslint/ban-types
export async function createUserHandler(req: Request<{}, {}, CreateUserInput['body']>, res: Response) {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send({
      error: e.message,
    });
  }
}
