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
exports.tweetModel = exports.Tweets = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../../models");
class Tweets extends sequelize_1.Model {
}
exports.Tweets = Tweets;
class TweetModel {
    constructor(Model) {
        this.tweetModel = Model;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tweetModel.create(data);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tweetModel.findByPk(id);
        });
    }
    findAll(data, include) {
        return __awaiter(this, void 0, void 0, function* () {
            if (include)
                data.include = [
                    { model: models_1.userModel, as: "user" },
                    { model: models_1.commentModel, as: "comment" },
                ];
            return this.tweetModel.findAll(data);
        });
    }
}
exports.tweetModel = new TweetModel(models_1.tweetModel);
//# sourceMappingURL=tweet.database.factory.js.map