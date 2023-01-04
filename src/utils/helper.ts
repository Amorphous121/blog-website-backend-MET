import { sign } from 'jsonwebtoken';

import CONFIG from 'config';
import { IDeletedPayload } from 'interfaces/comment.interface';

export const signJWT = (payload: { _id: string }): string => {
  return sign(payload, CONFIG.JWT_SECRET, {
    expiresIn: '7d',
    audience: 'example.com',
    subject: payload._id.toString()
  });
};

export const getDeletePayload = (userId: string): IDeletedPayload => {
  return { isDeleted: true, deletedBy: userId, deletedAt: new Date() };
};
