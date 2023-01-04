import { ObjectId, PopulatedDoc } from 'mongoose';

import { IDateUpdateFields, IDefaultFields } from './common.interface';
import { IBlog } from './blog.interface';
import { IUser } from './user.interface';

export interface IComment extends IDefaultFields, IDateUpdateFields {
  comment: string
  commentor: ObjectId | PopulatedDoc<IUser>
  blog: ObjectId | PopulatedDoc<IBlog>
}

export interface IDeletedPayload {
  isDeleted: boolean
  deletedBy: string
  deletedAt: Date
}
