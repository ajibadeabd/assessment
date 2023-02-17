"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.authController = void 0;
const user_database_factory_1 = require("../databaseFactory/user.database.factory");
const bcrypt = __importStar(require("bcrypt"));
const token_1 = require("../auth/token");
class AuthController {
    constructor(Model) {
        // Route handler for creating a new user.
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            let name = email.split("@")[0];
            try {
                const user = yield this.userModel.findOne({ email });
                if (user) {
                    return res.status(400).json({ message: "User already exists" });
                }
                const newUser = yield this.userModel.create({ name, email, password });
                const savedUser = yield newUser.save();
                return res.status(201).json({ message: "User registered successfully" });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
        // Route handler for creating a new user.
        this.loginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield this.userModel.findOne({ email }, {
                    include: ["password"],
                });
                if (!user) {
                    return res.status(201).json({ message: "User not found" });
                }
                let validPassword = yield bcrypt.compare(password, user.password);
                if (!validPassword)
                    return res.status(400).json({ message: "incorrect password", user });
                return res.status(200).json({
                    token: token_1.jwtService.generate({ userId: user.id }),
                    user: { email, userId: user.id },
                });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
        // Model: typeof userModel
        this.userModel = Model;
    }
}
exports.authController = new AuthController(user_database_factory_1.userModel);
// userModel // schema was pass here to follow dependency inversion principle
//# sourceMappingURL=auth.js.map