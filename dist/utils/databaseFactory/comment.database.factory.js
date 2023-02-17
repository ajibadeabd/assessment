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
exports.commentModel = exports.Comments = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../../models");
class Comments extends sequelize_1.Model {
}
exports.Comments = Comments;
class CommentModel {
    constructor(Model) {
        this.commentModel = Model;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(data);
            return this.commentModel.create(data);
        });
    }
}
exports.commentModel = new CommentModel(models_1.commentModel);
//# sourceMappingURL=comment.database.factory.js.map