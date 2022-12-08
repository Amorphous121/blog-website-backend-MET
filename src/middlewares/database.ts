import { connect, set } from 'mongoose';
import CONFIG from 'config';

export const connectDb = async (): Promise<typeof import('mongoose')> => {
  const { isDev, DATABASE_HOST, DATABASE_NAME, DATABASE_PORT } = CONFIG;

  if (isDev) {
    set('debug', true);
  }
  set('strictQuery', true);

  return await connect(
    `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`
  );
};
