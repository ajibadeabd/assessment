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
exports.userModel = exports.Users = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
class Users extends sequelize_1.Model {
}
exports.Users = Users;
class UserModel {
    constructor(userModel) {
        this.userModel = userModel;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.create(data);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.findByPk(id);
        });
    }
    findOne(filterQuery, attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.findOne({
                where: filterQuery,
                attributes,
            });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userModel.update(data, {
                where: { userId: id },
            });
            return result[0] === 1;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userModel.destroy({ where: { userId: id } });
            return result === 1;
        });
    }
}
exports.userModel = new UserModel(models_1.userModel);
//# sourceMappingURL=user.database.factory.js.map