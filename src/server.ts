import http from 'http';
import app from 'app';

import CONFIG from 'config';
import { logger } from 'utils/logger';
import { connectDb } from 'database';

const server = http.createServer(app);

server.listen(CONFIG.PORT, () => {
  connectDb()
    .then(() => {
      logger.info('=================================');
      logger.info(`======= ENV: ${CONFIG.NODE_ENV} =======`);
      logger.info(`🚀 App listening on the port ${CONFIG.PORT}`);
      logger.info('=================================');
    })
    .catch((e) => {
      logger.error(e);
      process.exit(1);
    });
});
