import { ObjectId, PopulatedDoc } from 'mongoose';

import { ENTITY_TYPE } from 'enums';
import { IUser } from './user.interface';
import { IDateUpdateFields } from './common.interface';

export interface IUserLikes extends IDateUpdateFields {
  entityType: ENTITY_TYPE
  entityId: ObjectId
  userId: ObjectId | PopulatedDoc<IUser>
}
