import express from 'express';
import config from 'config';
import cors from 'cors';

import connectDB from './utils/connect';
import logger from './utils/logger';
import routes from './routes/routes';
import deserializeUser from './middlewares/deserializeUser'
import createServer from './utils/server';

// Variables
const port = config.get<string>('port');

const app = createServer();

// Middlewares
app.use(express.json());
app.use(cors())
app.use(deserializeUser)


app.listen(port, async () => {
  logger.info(`Api is running at http://localhost:${port}`);

  await connectDB();
});
