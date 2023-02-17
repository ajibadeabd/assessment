"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorFactories = exports.validatorRule = void 0;
const express_validator_1 = require("express-validator");
const validatorRule = (req, res, next) => {
    const error = (0, express_validator_1.validationResult)(req).formatWith(({ msg }) => msg);
    const hasError = !error.isEmpty();
    if (hasError) {
        res.status(422).json({ error: error.array() });
    }
    else {
        next();
    }
};
exports.validatorRule = validatorRule;
class ValidatorFactory {
    constructor() {
        this.password = (0, express_validator_1.body)("password")
            .isStrongPassword()
            .withMessage("Provide a strong password like  email!#A1");
        this.tweetId = (0, express_validator_1.param)("tweetId")
            .isString()
            .isUUID()
            .withMessage("tweetId must be a valid id");
        this.content = (0, express_validator_1.body)("content")
            .isString()
            .notEmpty()
            .withMessage("content must not be empty");
        this.id = (0, express_validator_1.param)("id")
            .isMongoId()
            .withMessage("Provide a valid product id");
        this.email = (0, express_validator_1.body)("email").isEmail().withMessage("Provide a valid email");
        this.getProductById = [this.id];
        this.registerUserValidation = [this.password, this.email];
        this.loginUserValidation = [this.password, this.email];
        this.createTweetValidation = [this.content];
        this.createCommentValidation = [this.content, this.tweetId];
        this.deleteTweetValidation = [this.tweetId];
    }
}
exports.ValidatorFactories = new ValidatorFactory();
//# sourceMappingURL=index.js.map