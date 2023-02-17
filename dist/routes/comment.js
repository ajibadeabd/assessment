"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils"); // Custom validation middleware functions
const comment_1 = require("../controllers/comment"); // Controller functions for handling product-related logic
const passport_1 = require("../auth/passport");
exports.default = (commentRouter) => {
    return commentRouter.post("/:tweetId", passport_1.authenticateUser, utils_1.ValidatorFactories.createCommentValidation, utils_1.validatorRule, comment_1.commentController.createComment);
};
//# sourceMappingURL=comment.js.map