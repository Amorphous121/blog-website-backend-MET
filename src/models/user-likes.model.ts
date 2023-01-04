import { model, Schema } from 'mongoose';

import { IUserLikes } from 'interfaces/user-likes.interface';
import { ENTITY_TYPE } from 'enums';
import { schemaOptions, defaultSchemaFields, defaultPreFindMiddleware, defaultRegexForMiddlewares } from './schema-utils';

const userLikesSchema = new Schema<IUserLikes>(
  {
    entityId: { type: Schema.Types.ObjectId },
    entityType: { type: String, enum: ENTITY_TYPE },
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    ...defaultSchemaFields
  },
  { ...schemaOptions }
);

userLikesSchema.pre(defaultRegexForMiddlewares, defaultPreFindMiddleware);

userLikesSchema.index({ entityId: 1, isDeleted: 1 });
userLikesSchema.index({ enitityType: 1, isDeleted: 1 });
userLikesSchema.index({ userId: 1, isDeleted: 1 });

const UserLikesModel = model('userLikes', userLikesSchema);
export default UserLikesModel;
