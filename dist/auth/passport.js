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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = exports.secret_key = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const databaseFactory_1 = require("../databaseFactory");
const jwtOptions = {};
jwtOptions.jwtFromRequest = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "your_jwt_secret";
exports.secret_key = jwtOptions.secretOrKey;
const jwtStrategy = new passport_jwt_1.Strategy(jwtOptions, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield databaseFactory_1.userModel.findOne({
            id: payload.userId,
        });
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }
    catch (err) {
        return done(err, false);
    }
}));
passport_1.default.use(jwtStrategy);
// middleware to add user to req.user after successful authentication
exports.authenticateUser = passport_1.default.authenticate("jwt", {
    session: false,
});
//# sourceMappingURL=passport.js.map