import { RequestHandler } from 'express';

import HttpException from 'exception/HttpException';
import * as CommentService from 'services/comment.service';

export const createComment: RequestHandler<{ userId: string, blogId: string }, any, { comment: string }, {}> = async (req, res, next) => {
  try {
    const { userId, blogId } = req.params;
    const { comment } = req.body;
    return await CommentService.createComment({ comment, userId, blogId });
  } catch (error) {
    next(error);
  }
};

export const getAllComments: RequestHandler<{ [key in 'blogId' | 'userId']: string }, {}, { comment: string }, {}> = async (req, res, next) => {
  try {
    const { userId, blogId } = req.params;
    return await CommentService.getAllComments(userId, blogId);
  } catch (error) {
    next(error);
  }
};

export const getCommentById: RequestHandler<{ [key in 'blogId' | 'userId' | 'commentId']: string }, any, {}, {}> = async (req, res, next) => {
  try {
    const { userId, blogId, commentId } = req.params;
    const comment = await CommentService.getCommentById({ commentId, blogId, userId });
    if (comment == null) throw new HttpException(404, "Comment doesn't exists with given id");
    return comment;
  } catch (error) {
    next(error);
  }
};
