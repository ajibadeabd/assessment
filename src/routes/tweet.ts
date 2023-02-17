import { Router } from "express"; // Express router
import { ValidatorFactories, validatorRule } from "../utils"; // Custom validation middleware functions
import { tweetController } from "../controllers/tweet"; // Controller functions for handling product-related logic
import { authenticateUser } from "../utils/passport";

export default (tweetRouter: Router) => {
  return tweetRouter
    .delete(
      "/:tweetId",
      authenticateUser,
      ValidatorFactories.deleteTweetValidation,
      validatorRule,
      tweetController.deleteTweet
    )
    .post(
      "/",
      authenticateUser,
      ValidatorFactories.createTweetValidation,
      validatorRule,
      tweetController.createTweet
    )
    .get("/all", tweetController.getAllTweet);
};
