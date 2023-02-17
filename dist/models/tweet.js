"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const users_1 = require("./users");
exports.default = (sequelize, DataTypes) => {
    class Tweet extends sequelize_1.Model {
        static associate(models) {
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
    Tweet.init({
        userId: users_1.UUID,
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id: Object.assign(Object.assign({}, users_1.UUID), { primaryKey: true }),
    }, {
        sequelize,
        modelName: "Tweet",
    });
    return Tweet;
};
//# sourceMappingURL=tweet.js.map