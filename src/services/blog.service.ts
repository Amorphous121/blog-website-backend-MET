import BlogModel from 'models/blog.model';
import LikeCountModel from 'models/likes-count.model';
import { IBlog } from 'interfaces/blog.interface';
import { LeanDocument } from 'mongoose';

export const createBlog = async (
  userId: string,
  blogPayload: Pick<IBlog, 'content' | 'title'>
): Promise<IBlog> => {
  const blog = (await BlogModel.create({ ...blogPayload, author: userId })).toObject();
  await LikeCountModel.create({ entityId: blog._id });
  return blog;
};

export const fetchAllBlogs = async (userId: string): Promise<Array<LeanDocument<IBlog>>> => {
  return await BlogModel.find({ author: userId }).lean();
};

export const fetchBlogById = async (
  userId: string,
  blogId: string
): Promise<LeanDocument<IBlog>> => {
  return await BlogModel.findOne({ author: userId, _id: blogId }).lean();
};
