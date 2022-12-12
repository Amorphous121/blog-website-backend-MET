import { model, Schema } from 'mongoose';

import { ILikesCount } from 'interfaces/likes-count.interface';
import { defaultPreFindMiddleware, defaultSchemaFields, schemaOptions } from './schema-utils';

const likesCountSchema = new Schema<ILikesCount>(
  {
    entityId: { type: Schema.Types.ObjectId },
    likesCount: { type: Number, default: 0, min: 0 },
    ...defaultSchemaFields
  },
  { ...schemaOptions }
);

likesCountSchema.pre(/\b(find|findOne|countDocuments|findById)\b/, defaultPreFindMiddleware);

likesCountSchema.index({ entityId: 1, isDeleted: 1 });

const LikesCountModel = model('likesCount', likesCountSchema);
export default LikesCountModel;
