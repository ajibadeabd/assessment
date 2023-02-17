import { Model } from "sequelize";
import { UUID } from "./users";

export default (sequelize: any, DataTypes: any) => {
  class Comment extends Model {
    public content!: string;
    public tweetId!: string;
    public id!: string;

    //public getUser!: () => Promise<any>;
    static associate(models: any) {
      Comment.belongsTo(models.Tweet, {
        foreignKey: "tweetId",
        as: "tweet",
      });
    }
  }
  Comment.init(
    {
      id: { ...UUID, primaryKey: true },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tweetId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );

  return Comment;
};
