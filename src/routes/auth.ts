import { Router } from "express"; // Express router
import { ValidatorFactories, validatorRule } from "../utils"; // Custom validation middleware functions
import { authController } from "../controllers/auth"; // Controller functions for handling product-related logic

// Create a new router instance

// Export the router as a default module
export default (authRouter: Router) => {
  return authRouter
    .post(
      "/register",
      ValidatorFactories.registerUserValidation,
      validatorRule,
      authController.createUser
    )
    .post(
      "/login",
      ValidatorFactories.loginUserValidation,
      validatorRule,
      authController.loginUser
    );
};
