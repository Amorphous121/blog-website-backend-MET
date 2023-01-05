import { Router } from 'express';
import { checkAuthentication } from 'middlewares/auth.middleware';
import { validate } from 'middlewares/validation.middleware';
import {
  CreateBlogValidation,
  DeleteBlogValidation,
  FetchAllBlogsValidation,
  FetchBlogByBlogId,
  UpdateBlogValidation
} from 'validations/blog.validation';

import * as BlogController from '../controllers/blog.controller';

const blogRouter = Router({ mergeParams: true });

blogRouter.get('/', checkAuthentication, validate(FetchAllBlogsValidation), BlogController.fetchAllBlogs);
blogRouter.get('/:blogId', checkAuthentication, validate(FetchBlogByBlogId), BlogController.fetchBlogById);
blogRouter.post('/', checkAuthentication, validate(CreateBlogValidation), BlogController.createBlog);
blogRouter.put('/:blogId', checkAuthentication, validate(UpdateBlogValidation), BlogController.updateBlogById);
blogRouter.delete('/:blogId', checkAuthentication, validate(DeleteBlogValidation), BlogController.deleteBlogById);

export default blogRouter;
