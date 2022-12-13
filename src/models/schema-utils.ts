import {
  CallbackWithoutResultAndOptionalError,
  PreMiddlewareFunction,
  Query,
  Schema
} from 'mongoose';

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

export const defaultRegexForMiddlewares =
  /\b(count|countDocuments|find|findOne|findOneAndUpdate|findById|find|update|updateOne)\b/;

export const defaultPreFindMiddleware: PreMiddlewareFunction = async function (
  this: Query<any, any, Record<string, never>, any>,
  next: CallbackWithoutResultAndOptionalError
): Promise<void> {
  if (!('isDeleted' in this.getFilter())) {
    this.setQuery({ isDeleted: false });
  }

  if (!('sort' in this.getOptions())) {
    void this.setOptions({ sort: { createAt: -1 } });
  }

  next();
};
