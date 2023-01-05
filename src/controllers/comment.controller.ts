import { RequestHandler } from 'express';

import HttpException from 'exception/HttpException';
import * as CommentService from 'services/comment.service';
import { getSuccessResponse } from 'utils/response.util';

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

export const updateCommentById: RequestHandler<{ [key in 'blogId' | 'userId' | 'commentId']: string }, any, { comment?: string }, {}> = async (
  req,
  res,
  next
) => {
  try {
    const { userId, blogId, commentId } = req.params;
    const payload = req.body;
    const comment = await CommentService.updateCommentById(userId, blogId, commentId, payload);
    return res.status(200).json(getSuccessResponse('Comment updated successfully.', comment != null ? comment : {}));
  } catch (error) {
    next(error);
  }
};
