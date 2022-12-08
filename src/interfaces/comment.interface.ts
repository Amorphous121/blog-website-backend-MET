import { ObjectId, PopulatedDoc } from 'mongoose';

import { IDateUpdateFields, IDeletionFields } from './common.interface';
import { IBlog } from './blog.interface';
import { IUser } from './user.interface';

export interface IComment extends IDeletionFields, IDateUpdateFields {
  comment: string
  author: ObjectId | PopulatedDoc<IUser>
  blog: ObjectId | PopulatedDoc<IBlog>
}
