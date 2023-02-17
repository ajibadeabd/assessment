"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const tweet_1 = __importDefault(require("./tweet"));
const comment_1 = __importDefault(require("./comment"));
const routers = (app) => {
    return app
        .use("/api/auth", (0, auth_1.default)((0, express_1.Router)()))
        .use("/api/tweet", (0, tweet_1.default)((0, express_1.Router)()))
        .use("/api/comment", (0, comment_1.default)((0, express_1.Router)()));
};
exports.default = routers;
//# sourceMappingURL=index.js.map