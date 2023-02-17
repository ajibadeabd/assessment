import { Model } from "sequelize";
import { commentModel as Comment } from "../models";

export class Comments extends Model {
  public userId!: string;
  public tweetId!: string;
  public content!: string;
}
class CommentModel {
  private commentModel;

  constructor(Model: typeof Comment) {
    this.commentModel = Model;
  }

  async create(data: {}): Promise<any> {
    return this.commentModel.create(data);
  }
}

export const commentModel = new CommentModel(Comment);
