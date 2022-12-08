import { ObjectId, PopulatedDoc } from 'mongoose';

import { IBlog } from './blog.interface';
import { IComment } from './comment.interface';
import { IDateUpdateFields } from './common.interface';

export interface ILikesCount extends IDateUpdateFields {
  entityId: ObjectId | PopulatedDoc<IBlog> | PopulatedDoc<IComment>
  likesCount: number
}
