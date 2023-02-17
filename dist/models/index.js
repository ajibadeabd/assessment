"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentModel = exports.tweetModel = exports.sequelize = exports.userModel = void 0;
const users_1 = __importDefault(require("./users"));
const tweet_1 = __importDefault(require("./tweet"));
const comment_1 = __importDefault(require("./comment"));
const sequelize_1 = require("sequelize");
let sequelize;
exports.sequelize = sequelize;
exports.sequelize = sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URI);
const tweetModel = (0, tweet_1.default)(sequelize, sequelize_1.DataTypes);
exports.tweetModel = tweetModel;
const userModel = (0, users_1.default)(sequelize, sequelize_1.DataTypes);
exports.userModel = userModel;
const commentModel = (0, comment_1.default)(sequelize, sequelize_1.DataTypes);
exports.commentModel = commentModel;
let db = {
    [tweetModel.name]: tweetModel,
    [userModel.name]: userModel,
    [commentModel.name]: commentModel,
};
if (tweetModel.associate) {
    tweetModel.associate(db);
}
if (userModel.associate) {
    userModel.associate(db);
}
if (commentModel.associate) {
    commentModel.associate(db);
}
//# sourceMappingURL=index.js.map