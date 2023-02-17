"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = require("./passport");
class JwtService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    generate(data) {
        return this.jwtService.sign(data, passport_1.secret_key);
    }
}
const jwtService = new JwtService(jsonwebtoken_1.default);
exports.jwtService = jwtService;
//# sourceMappingURL=token.js.map