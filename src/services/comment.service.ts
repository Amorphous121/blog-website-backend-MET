import { LeanDocument } from 'mongoose';

import { IComment } from 'interfaces/comment.interface';
import CommentModel from 'models/comment.model';
import HttpException from 'exception/HttpException';
import LikesCountModel from 'models/likes-count.model';
import { getDeletePayload } from 'utils/helper';
import * as BlogService from 'services/blog.service';

const getCommentsCount = async (userId: string, blogId: string, commentId: string): Promise<number> =>
  await CommentModel.countDocuments({ commentor: userId, blog: blogId, _id: commentId }).lean();

export const createComment = async (payload: {
  [index in 'userId' | 'blogId' | 'comment']: string;
}): Promise<LeanDocument<IComment>> => {
  const blogCount = await BlogService.getBlogCount(payload.userId, payload.blogId);
  if (blogCount === 0) throw new HttpException(400, "Blog doesn't exists");
  const comment = await CommentModel.create({ ...payload });
  await LikesCountModel.create({ entityId: comment._id });
  return await comment.toObject();
};

export const getAllComments = async (userId: string, blogId: string): Promise<Array<LeanDocument<IComment>>> => {
  const blogCount = await BlogService.getBlogCount(userId, blogId);
  if (blogCount === 0) throw new HttpException(400, "Blog doesn't exists");
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
  const blogCount = await BlogService.getBlogCount(userId, blogId);
  if (blogCount === 0) throw new HttpException(400, "Blog doesn't exists");

  const comment = await CommentModel.findOne({ _id: commentId });
  if (comment == null) return null;
  return await comment.toObject();
};

export const updateCommentById = async (
  userId: string,
  blogId: string,
  commentId: string,
  payload: { comment?: string }
): Promise<LeanDocument<IComment> | null> => {
  const commentCount = await getCommentsCount(userId, blogId, commentId);
  if (commentCount === 0) throw new HttpException(404, "Comment doesn't exists");
  const comment = await CommentModel.findOneAndUpdate(
    { _id: commentId, commentor: userId, blog: blogId },
    { $set: { ...payload } },
    { new: true }
  ).lean();
  return comment;
};

export const deleteCommentsByBlogId = async (userId: string, blogId: string): Promise<void> => {
  await CommentModel.updateMany({ blog: blogId }, { $set: { ...getDeletePayload(userId) } });
};
