import { LeanDocument } from 'mongoose';

import { IComment } from 'interfaces/comment.interface';
import CommentModel from 'models/comment.model';
import BlogModel from 'models/blog.model';
import HttpException from 'exception/HttpException';
import LikesCountModel from 'models/likes-count.model';
import { getDeletePayload } from 'utils/helper';

export const createComment = async (payload: {
  [index in 'userId' | 'blogId' | 'comment']: string;
}): Promise<LeanDocument<IComment>> => {
  const isBlogExists = await BlogModel.countDocuments({ _id: payload.blogId, author: payload.userId });
  if (isBlogExists === 0) throw new HttpException(400, "Blog doesn't exists");
  const comment = await CommentModel.create({ ...payload });
  await LikesCountModel.create({ entityId: comment._id });
  return await comment.toObject();
};

export const getAllComments = async (userId: string, blogId: string): Promise<Array<LeanDocument<IComment>>> => {
  const isBlogExists = await BlogModel.countDocuments({ _id: blogId, author: userId });
  if (isBlogExists === 0) throw new HttpException(400, "Blog doesn't exists");
  const comments = await CommentModel.find({ blog: blogId }).lean();
  return comments;
};

export const getCommentById = async ({
  commentId,
  blogId,
  userId
}: {
  [index in 'userId' | 'blogId' | 'commentId']: string;
}): Promise<LeanDocument<IComment> | null> => {
  const isBlogExists = await BlogModel.countDocuments({ _id: blogId, author: userId });
  if (isBlogExists === 0) throw new HttpException(400, "Blog doesn't exists");

  const comment = await CommentModel.findOne({ _id: commentId });
  if (comment == null) return null;
  return await comment.toObject();
};

export const deleteCommentsByBlogId = async (userId: string, blogId: string): Promise<void> => {
  await CommentModel.updateMany({ blog: blogId }, { $set: { ...getDeletePayload(userId) } });
};
