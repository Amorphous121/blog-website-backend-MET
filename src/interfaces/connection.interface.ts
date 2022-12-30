import { ObjectId, PopulatedDoc } from 'mongoose';
import { IDateUpdateFields } from './common.interface';
import { IUser } from './user.interface';

export interface IConnection extends IDateUpdateFields {
  follower: ObjectId | PopulatedDoc<IUser>
  userId: ObjectId | PopulatedDoc<IUser>
  isConnected: boolean
}
