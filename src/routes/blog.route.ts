import { Router } from 'express';
import { checkAuthentication } from 'middlewares/auth.middleware';
import { validate } from 'middlewares/validation.middleware';
import { CreateBlogValidation, FetchAllBlogsValidation, FetchBlogByBlogId } from 'validations/blog.validation';

import * as BlogController from '../controllers/blog.controller';

const blogRouter = Router({ mergeParams: true });

blogRouter.get('/', checkAuthentication, validate(FetchAllBlogsValidation), BlogController.fetchAllBlogs);
blogRouter.get('/:blogId', checkAuthentication, validate(FetchBlogByBlogId), BlogController.fetchBlogById);
blogRouter.post('/', checkAuthentication, validate(CreateBlogValidation), BlogController.createBlog);
blogRouter.put('/:blogId', checkAuthentication, () => {});
blogRouter.delete('/:blogId', checkAuthentication, () => {});

export default blogRouter;
