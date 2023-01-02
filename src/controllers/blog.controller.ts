import HttpException from 'exception/HttpException';
import { RequestHandler } from 'express';
import { IBlog } from 'interfaces/blog.interface';

import * as BlogService from 'services/blog.service';
import { getSuccessResponse } from 'utils/response.util';

export const createBlog: RequestHandler<
{ userId: string },
any,
Pick<IBlog, 'title' | 'content'>,
any
> = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { title, content } = req.body;
    const blog = await BlogService.createBlog(userId, { title, content });
    return res.status(200).json(getSuccessResponse('Blog created successfully!', blog));
  } catch (error) {
    next(error);
  }
};

export const fetchAllBlogs: RequestHandler<{ userId: string }, any, {}, any> = async (
  req,
  res,
  next
) => {
  try {
    const { userId } = req.params;
    const blogs = await BlogService.fetchAllBlogs(userId);
    return res.status(200).json(getSuccessResponse('Blogs fetched successfully', blogs));
  } catch (error) {
    next(error);
  }
};

export const fetchBlogById: RequestHandler<
{ userId: string, blogId: string },
any,
any,
any
> = async (req, res, next) => {
  try {
    const { userId, blogId } = req.params;
    const blog = await BlogService.fetchBlogById(userId, blogId);
    if (blog == null) throw new HttpException(404, 'Blog not found with given id!');
    return res.status(200).json(getSuccessResponse('Blog fetched successfully', blog));
  } catch (error) {
    next(error);
  }
};
