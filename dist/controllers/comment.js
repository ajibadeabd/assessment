"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentController = void 0;
const databaseFactory_1 = require("../utils/databaseFactory");
class CommentController {
    constructor(TweetModel, CommentModel) {
        // Route handler for creating a new comment on a tweet.
        this.createComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { content } = req.body;
            const user = req.user;
            const { tweetId } = req.params;
            try {
                const tweet = yield this.tweetModel.findById(tweetId);
                if (!tweet) {
                    return res.status(404).json({ message: "Tweet not found" });
                }
                const comment = yield this.commentModel.create({
                    content,
                    tweetId,
                    userId: user.id,
                });
                return res.status(201).json(comment);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
        this.tweetModel = TweetModel;
        this.commentModel = CommentModel;
    }
}
exports.commentController = new CommentController(databaseFactory_1.tweetModel, databaseFactory_1.commentModel);
//# sourceMappingURL=comment.js.map