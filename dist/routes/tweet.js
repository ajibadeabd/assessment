"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils"); // Custom validation middleware functions
const tweet_1 = require("../controllers/tweet"); // Controller functions for handling product-related logic
const passport_1 = require("../auth/passport");
exports.default = (tweetRouter) => {
    return tweetRouter
        .delete("/:tweetId", passport_1.authenticateUser, utils_1.ValidatorFactories.deleteTweetValidation, utils_1.validatorRule, tweet_1.tweetController.deleteTweet)
        .post("/", passport_1.authenticateUser, utils_1.ValidatorFactories.createTweetValidation, utils_1.validatorRule, tweet_1.tweetController.createTweet)
        .get("/all", passport_1.authenticateUser, tweet_1.tweetController.getAllTweet);
};
//# sourceMappingURL=tweet.js.map