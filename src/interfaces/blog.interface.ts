import { ObjectId, PopulatedDoc } from 'mongoose';

import { IUser } from './user.interface';
import { IDateUpdateFields, IDefaultFields } from './common.interface';

export interface IBlog extends IDefaultFields, IDateUpdateFields {
  title: string
  content: string
  author: ObjectId | PopulatedDoc<IUser>
}
