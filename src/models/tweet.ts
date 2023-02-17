import { Model } from "sequelize";
import { UUID } from "./users";

export default (sequelize: any, DataTypes: any) => {
  class Tweet extends Model {
    public content!: string;
    public userId!: string;
    public id!: string;
    static associate(models: any) {
      Tweet.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      Tweet.hasMany(models.Comment, {
        foreignKey: "tweetId",
        as: "comment",
      });
    }
  }
  Tweet.init(
    {
      userId: UUID,
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id: { ...UUID, primaryKey: true },
    },
    {
      sequelize,
      modelName: "Tweet",
    }
  );

  return Tweet;
};
