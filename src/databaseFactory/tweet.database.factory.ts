import { FindAttributeOptions, Model } from "sequelize";
import {
  tweetModel as Tweet,
  userModel as User,
  commentModel as Comment,
} from "../models";

export class Tweets extends Model {
  public userId!: string;
  public tweetId!: string;
  public content!: string;
}
class TweetModel {
  private tweetModel;

  constructor(Model: typeof Tweet) {
    this.tweetModel = Model;
  }

  async create(data: {}): Promise<any> {
    return this.tweetModel.create(data);
  }

  async findById(id: string): Promise<any> {
    return this.tweetModel.findByPk(id);
  }
  async findAll(data: any, include?: Boolean): Promise<any> {
    if (include)
      data.include = [
        { model: User, as: "user" },
        { model: Comment, as: "comment" },
      ];

    return this.tweetModel.findAll(data);
  }
}

export const tweetModel = new TweetModel(Tweet);
