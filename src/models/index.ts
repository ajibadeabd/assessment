import User from "./users";
import Tweet from "./tweet";
import Comment from "./comment";
import { Sequelize, DataTypes } from "sequelize";

let sequelize: Sequelize;
sequelize = new Sequelize(process.env.DATABASE_URI as string);

const tweetModel = Tweet(sequelize, DataTypes);
const userModel = User(sequelize, DataTypes);
const commentModel = Comment(sequelize, DataTypes);
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

export { userModel, sequelize, tweetModel, commentModel };

// let db = {
//   [UserModel.name]: UserModel,
//   [TweetModel.name]: TweetModel,
// };

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// // let
// // let { User: s, Tweet: s } = db;
// // console.log(db.Tweet, "Tee", db.User);
// // let userModel: typeof User = db.User;
// // let tweetModel = db.Tweet;
// let { User: userModel, Tweet: tweetModel } = db;
// export { userModel, sequelize, tweetModel };
