import { CallbackWithoutResultAndOptionalError, PreMiddlewareFunction, Query, Schema } from 'mongoose';

export const schemaOptions = {
  timestamps: true,
  versionKey: false,
  autoIndex: true
};

export const defaultSchemaFields = {
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
  deletedBy: { type: Schema.Types.ObjectId, ref: 'user', default: null }
};

export const defaultRegexForMiddlewares = /\b(count|countDocuments|find|findOne|findOneAndUpdate|findById|find|update|updateOne)\b/;

export const defaultPreFindMiddleware: PreMiddlewareFunction = async function (
  this: Query<any, any, Record<string, never>, any>,
  next: CallbackWithoutResultAndOptionalError
): Promise<void> {
  const queryFilters = this.getFilter();
  const queryOptions = this.getOptions();

  if (!('isDeleted' in queryFilters)) {
    this.setQuery({ ...queryFilters, isDeleted: false });
  }
  if (!('sort' in queryOptions)) {
    void this.setOptions({ ...queryOptions, sort: { createdAt: -1 } });
  }
  next();
};
