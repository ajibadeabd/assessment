"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils"); // Custom validation middleware functions
const auth_1 = require("../controllers/auth"); // Controller functions for handling product-related logic
// Create a new router instance
// Export the router as a default module
exports.default = (authRouter) => {
    return authRouter
        .post("/register", utils_1.ValidatorFactories.registerUserValidation, utils_1.validatorRule, auth_1.authController.createUser)
        .post("/login", utils_1.ValidatorFactories.loginUserValidation, utils_1.validatorRule, auth_1.authController.loginUser);
};
//# sourceMappingURL=auth.js.map