"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = exports.Tweets = exports.Users = exports.commentModel = exports.tweetModel = exports.userModel = void 0;
const user_database_factory_1 = require("./user.database.factory");
Object.defineProperty(exports, "userModel", { enumerable: true, get: function () { return user_database_factory_1.userModel; } });
Object.defineProperty(exports, "Users", { enumerable: true, get: function () { return user_database_factory_1.Users; } });
const tweet_database_factory_1 = require("./tweet.database.factory");
Object.defineProperty(exports, "tweetModel", { enumerable: true, get: function () { return tweet_database_factory_1.tweetModel; } });
Object.defineProperty(exports, "Tweets", { enumerable: true, get: function () { return tweet_database_factory_1.Tweets; } });
const comment_database_factory_1 = require("./comment.database.factory");
Object.defineProperty(exports, "Comments", { enumerable: true, get: function () { return comment_database_factory_1.Comments; } });
Object.defineProperty(exports, "commentModel", { enumerable: true, get: function () { return comment_database_factory_1.commentModel; } });
//# sourceMappingURL=index.js.map