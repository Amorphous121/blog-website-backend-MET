import { LeanDocument } from 'mongoose';

import BlogModel from 'models/blog.model';
import LikeCountModel from 'models/likes-count.model';
import { IBlog } from 'interfaces/blog.interface';
import HttpException from 'exception/HttpException';
import { getDeletePayload } from 'utils/helper';
import * as CommentService from 'services/comment.service';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getBlogCount = (userId: string, blogId: string) => BlogModel.countDocuments({ author: userId, _id: blogId });

export const createBlog = async (userId: string, blogPayload: Pick<IBlog, 'content' | 'title'>): Promise<IBlog> => {
  const blog = (await BlogModel.create({ ...blogPayload, author: userId })).toObject();
  await LikeCountModel.create({ entityId: blog._id });
  return blog;
};

export const fetchAllBlogs = async (userId: string): Promise<Array<LeanDocument<IBlog>>> => {
  return await BlogModel.find({ author: userId }).lean();
};

export const fetchBlogById = async (userId: string, blogId: string): Promise<LeanDocument<IBlog>> => {
  return await BlogModel.findOne({ author: userId, _id: blogId }).lean();
};

export const updateBlog = async (
  userId: string,
  blogId: string,
  payload: Partial<Pick<IBlog, 'content' | 'title'>>
): Promise<LeanDocument<IBlog>> => {
  const isBlogExists = await BlogModel.countDocuments({ author: userId, _id: blogId });
  if (isBlogExists === 0) {
    throw new HttpException(404, "Blog doesn't exists with given id!");
  }
  return await BlogModel.findOneAndUpdate({ _id: blogId }, { $set: { ...payload } }, { new: true }).lean();
};

export const deleteBlog = async (userId: string, blogId: string): Promise<void> => {
  const blogCount = await getBlogCount(userId, blogId);
  if (blogCount === 0) throw new HttpException(404, "Blog doesn't exists with given id!");
  await BlogModel.updateMany({ author: userId }, { ...getDeletePayload(userId) });
  await CommentService.deleteCommentsByBlogId(userId, blogId);
};
