import { model, Schema } from 'mongoose';

import { IBlog } from 'interfaces/blog.interface';
import {
  schemaOptions,
  defaultSchemaFields,
  defaultPreFindMiddleware,
  defaultRegexForMiddlewares
} from './schema-utils';

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user' },
    ...defaultSchemaFields
  },
  { ...schemaOptions }
);

blogSchema.pre(defaultRegexForMiddlewares, defaultPreFindMiddleware);

blogSchema.index({ author: 1, isDeleted: 1 });

const BlogModel = model('blog', blogSchema);

export default BlogModel;
