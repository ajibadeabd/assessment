import { body, param, validationResult } from "express-validator";

export const validatorRule = (req: any, res: any, next: any) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);
  const hasError = !error.isEmpty();
  if (hasError) {
    res.status(422).json({ error: error.array() });
  } else {
    next();
  }
};

class ValidatorFactory {
  private password = body("password")
    .isStrongPassword()
    .withMessage("Provide a strong password like  email!#A1");
  private tweetId = param("tweetId")
    .isString()
    .isUUID()
    .withMessage("tweetId must be a valid id");
  private content = body("content")
    .isString()
    .notEmpty()
    .withMessage("content must not be empty");
  private id = param("id")
    .isMongoId()
    .withMessage("Provide a valid product id");
  private email = body("email").isEmail().withMessage("Provide a valid email");

  getProductById = [this.id];
  registerUserValidation = [this.password, this.email];
  loginUserValidation = [this.password, this.email];

  createTweetValidation = [this.content];
  createCommentValidation = [this.content, this.tweetId];
  deleteTweetValidation = [this.tweetId];
}
export const ValidatorFactories = new ValidatorFactory();
