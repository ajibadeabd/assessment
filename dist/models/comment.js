"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const users_1 = require("./users");
exports.default = (sequelize, DataTypes) => {
    class Comment extends sequelize_1.Model {
        //public getUser!: () => Promise<any>;
        static associate(models) {
            Comment.belongsTo(models.Tweet, {
                foreignKey: "tweetId",
                as: "tweet",
            });
        }
    }
    Comment.init({
        id: Object.assign(Object.assign({}, users_1.UUID), { primaryKey: true }),
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tweetId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Comment",
    });
    return Comment;
};
//# sourceMappingURL=comment.js.map