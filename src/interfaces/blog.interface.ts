import { ObjectId, PopulatedDoc } from 'mongoose';

import { IUser } from './user.interface';
import { IDateUpdateFields, IDeletionFields } from './common.interface';

export interface IBlog extends IDeletionFields, IDateUpdateFields {
  title: string
  content: string
  author: ObjectId | PopulatedDoc<IUser>
}
