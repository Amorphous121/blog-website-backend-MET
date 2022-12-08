import dotenv from 'dotenv';
import { cleanEnv, str, num, bool } from 'envalid';

dotenv.config({ path: `.env.${process.env.NODE_ENV ?? 'development'}` });

const CONFIG = cleanEnv(process.env, {
  NODE_ENV: str({ desc: 'The Current Environment for the application.' }),
  PORT: num({ desc: 'The port for the application to run.' }),
  JWT_SECRET: str({ desc: 'The jwt secret to sign jwt payloads.' }),
  BCRYPT_HASH_ROUND: num({
    desc: 'The number of rounds to salt the password.'
  }),
  DATABASE_HOST: str({ desc: 'The Host of the database.' }),
  DATABASE_PORT: num({ desc: 'The port of database server.' }),
  DATABASE_NAME: str({ desc: 'The name of the database.' }),
  CREDENTIALS: bool({ desc: 'True defines the seding cors headers.' }),
  LOG_DIR: str({ desc: 'directory path to store log files' })
});

export default CONFIG;
