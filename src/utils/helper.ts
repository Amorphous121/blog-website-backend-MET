import { sign } from 'jsonwebtoken';

import CONFIG from 'config';

export const signJWT = (payload: { _id: string }): string => {
  return sign(payload, CONFIG.JWT_SECRET, {
    expiresIn: '7d',
    audience: 'example.com',
    subject: payload._id.toString()
  });
};
