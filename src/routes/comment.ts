import { Router } from "express"; // Express router
import { ValidatorFactories, validatorRule } from "../utils"; // Custom validation middleware functions
import { commentController } from "../controllers/comment"; // Controller functions for handling product-related logic
import { authenticateUser } from "../utils/passport";

export default (commentRouter: Router) => {
  return commentRouter.post(
    "/:tweetId",
    authenticateUser,
    ValidatorFactories.createCommentValidation,
    validatorRule,
    commentController.createComment
  );
};
