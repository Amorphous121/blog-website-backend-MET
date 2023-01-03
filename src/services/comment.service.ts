import { LeanDocument } from 'mongoose';

import { IComment } from 'interfaces/comment.interface';
import CommentModel from 'models/comment.model';
import BlogModel from 'models/blog.model';
import HttpException from 'exception/HttpException';
import LikesCountModel from 'models/likes-count.model';

export const createComment = async (payload: {
  [index in 'authorId' | 'blog' | 'comment']: string;
}): Promise<LeanDocument<IComment>> => {
  const isBlogExists = await BlogModel.countDocuments({ _id: payload.blog });
  if (isBlogExists === 0) throw new HttpException(400, "Blog doesn't exists");
  const comment = await CommentModel.create({ ...payload });
  await LikesCountModel.create({ entityId: comment._id });
  return await comment.toObject();
};

export const getAllComments = async (
  author: string,
  blog: string
): Promise<Array<LeanDocument<IComment>>> => {
  const isBlogExists = await BlogModel.countDocuments({ _id: blog, author });
  if (isBlogExists === 0) throw new HttpException(400, "Blog doesn't exists");
  const comments = await CommentModel.find({ blog }).lean();
  return comments;
};

export const getCommentById = async ({
  commentId,
  blog,
  author
}: {
  [index in 'authorId' | 'blogId' | 'commentId']: string;
}): Promise<LeanDocument<IComment> | null> => {
  const isBlogExists = await BlogModel.countDocuments({ _id: blog, author });
  if (isBlogExists === 0) throw new HttpException(400, "Blog doesn't exists");

  const comment = await CommentModel.findOne({ _id: commentId });
  if (comment == null) return null;
  return await comment.toObject();
};
