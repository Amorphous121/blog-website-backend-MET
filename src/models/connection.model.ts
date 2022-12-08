import { model, Schema } from 'mongoose';

import { IConnection } from 'interfaces/connection.interface';
import {
  defaultPreFindMiddleware,
  defaultSchemaFields,
  schemaOptions
} from './schema-utils';

const connectionSchema = new Schema<IConnection>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    follower: { type: Schema.Types.ObjectId, ref: 'user' },
    isConnected: { type: Boolean, default: false },
    ...defaultSchemaFields
  },
  { ...schemaOptions }
);

connectionSchema.pre(
  /\b(find|findOne|countDocuments|findById)\b/,
  defaultPreFindMiddleware
);

connectionSchema.index({ userId: 1, isDeleted: 1 });
connectionSchema.index({ follower: 1, isDeleted: 1 });

const ConnectionModel = model('connection', connectionSchema);
export default ConnectionModel;
