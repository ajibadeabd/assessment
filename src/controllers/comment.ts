import { Request, Response } from "express";
import {
  tweetModel,
  Users,
  commentModel,
} from "../utils/databaseFactory";

class CommentController {
  private tweetModel;
  private commentModel;

  constructor(
    TweetModel: typeof tweetModel,
    CommentModel: typeof commentModel
  ) {
    this.tweetModel = TweetModel;
    this.commentModel = CommentModel;
  }

  // Route handler for creating a new comment on a tweet.
  createComment = async (req: Request, res: Response) => {
    const { content } = req.body;
    const user = req.user as Users;
    const { tweetId } = req.params;
    try {
      const tweet = await this.tweetModel.findById(tweetId);
      if (!tweet) {
        return res.status(404).json({ message: "Tweet not found" });
      }
      const comment = await this.commentModel.create({
        content,
        tweetId,
        userId: user.id,
      });
      return res.status(201).json(comment);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };
}

export const commentController = new CommentController(
  tweetModel,
  commentModel
);
