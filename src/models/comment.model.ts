import { model, Schema } from 'mongoose';

import { IComment } from 'interfaces/comment.interface';
import { defaultPreFindMiddleware, defaultSchemaFields, schemaOptions } from './schema-utils';

const commentSchema = new Schema<IComment>(
  {
    comment: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user' },
    blog: { type: Schema.Types.ObjectId, ref: 'user' },
    ...defaultSchemaFields
  },
  { ...schemaOptions }
);

commentSchema.pre(/\b(find|findOne|countDocuments|findById)\b/, defaultPreFindMiddleware);

commentSchema.index({ author: 1, isDeleted: 1 });
commentSchema.index({ blog: 1, isDeleted: 1 });

const CommentModel = model('comment', commentSchema);

export default CommentModel;
