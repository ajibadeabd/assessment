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
exports.tweetController = void 0;
const databaseFactory_1 = require("../utils/databaseFactory");
class TweetController {
    constructor(Model) {
        // Route handler for creating a new tweet.
        this.createTweet = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { content } = req.body;
            const user = req.user;
            // console.log(user);
            try {
                const tweet = yield this.tweetModel.create({
                    content,
                    userId: user.id,
                });
                // await tweet.save();
                return res.status(201).json(tweet);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
        this.getAllTweet = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tweet = yield this.tweetModel.findAll({}, true);
                return res.status(201).json(tweet);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
        // Route handler for deleting a tweet.
        this.deleteTweet = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { tweetId } = req.params;
            const user = req.user;
            try {
                const tweet = yield this.tweetModel.findById(tweetId);
                if (!tweet) {
                    return res.status(404).json({ message: "Tweet not found" });
                }
                if (tweet.userId !== user.id) {
                    return res
                        .status(401)
                        .json({ message: "Not authorized to delete this tweet" });
                }
                yield tweet.destroy();
                return res.status(204).json({ message: "Tweet deleted" });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
        // Route handler for creating a new comment on a tweet.
        this.createComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { text } = req.body;
            const user = req.user;
            const { tweetId } = req.params;
            try {
                const tweet = yield this.tweetModel.findById(tweetId);
                if (!tweet) {
                    return res.status(404).json({ message: "Tweet not found" });
                }
                const comment = yield tweet.createComment({
                    text,
                    userId: user.email,
                });
                return res.status(201).json(comment);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
        this.tweetModel = Model;
    }
}
exports.tweetController = new TweetController(databaseFactory_1.tweetModel);
//# sourceMappingURL=tweet.js.map