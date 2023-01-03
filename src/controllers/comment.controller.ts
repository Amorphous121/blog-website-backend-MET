import HttpException from 'exception/HttpException';
import { RequestHandler } from 'express';

import * as CommentService from 'services/comment.service';

export const createComment: RequestHandler<
{ [key in 'blog' | 'authorId']: string },
{},
{ comment: string },
{}
> = async (req, res, next) => {
  try {
    const { authorId, blog } = req.params;
    const { comment } = req.body;
    return await CommentService.createComment({ comment, authorId, blog });
  } catch (error) {
    next(error);
  }
};

export const getAllComments: RequestHandler<
{ [key in 'blogId' | 'authorId']: string },
{},
{ comment: string },
{}
> = async (req, res, next) => {
  try {
    const { authorId, blogId } = req.params;
    return await CommentService.getAllComments(authorId, blogId);
  } catch (error) {
    next(error);
  }
};

export const getCommentById: RequestHandler<{
  [key in 'blogId' | 'authorId' | 'commentId']: string;
}> = async (req, res, next) => {
  try {
    const { authorId, blogId, commentId } = req.params;
    const comment = await CommentService.getCommentById({ commentId, blogId, authorId });
    if (comment == null) throw new HttpException(404, "Comment doesn't exists with given id");
    return comment;
  } catch (error) {
    next(error);
  }
};
