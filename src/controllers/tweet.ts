import { Request, Response } from "express";
import { tweetModel, Users, userModel } from "../utils/databaseFactory";

class TweetController {
  private tweetModel;

  constructor(Model: typeof tweetModel) {
    this.tweetModel = Model;
  }

  // Route handler for creating a new tweet.
  createTweet = async (req: Request, res: Response) => {
    const { content } = req.body;
    const user = req.user as Users;
    try {
      const tweet = await this.tweetModel.create({
        content,
        userId: user.id,
      });
      // await tweet.save();

      return res.status(201).json(tweet);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  getAllTweet = async (req: Request, res: Response) => {
    try {
      const tweet = await this.tweetModel.findAll({}, true);

      return res.status(201).json(tweet);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  // Route handler for deleting a tweet.
  deleteTweet = async (req: Request, res: Response) => {
    const { tweetId } = req.params;
    const user = req.user as Users;
    try {
      const tweet = await this.tweetModel.findById(tweetId);
      if (!tweet) {
        return res.status(404).json({ message: "Tweet not found" });
      }
      if (tweet.userId !== user.id) {
        return res
          .status(401)
          .json({ message: "Not authorized to delete this tweet" });
      }
      await tweet.destroy();
      return res.status(204).json({ message: "Tweet deleted" });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  // Route handler for creating a new comment on a tweet.
  createComment = async (req: Request, res: Response) => {
    const { text } = req.body;
    const user = req.user as Users;
    const { tweetId } = req.params;
    try {
      const tweet = await this.tweetModel.findById(tweetId);
      if (!tweet) {
        return res.status(404).json({ message: "Tweet not found" });
      }
      const comment = await tweet.createComment({
        text,
        userId: user.email,
      });
      return res.status(201).json(comment);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };
}

export const tweetController = new TweetController(tweetModel);
