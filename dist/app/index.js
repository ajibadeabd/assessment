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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const yamljs_1 = __importDefault(require("yamljs"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const index_1 = require("../models/index");
const routes_1 = __importDefault(require("../routes"));
const swaggerDocument = yamljs_1.default.load("swagger.yaml");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((err, req, res, next) => {
    if (err.status === 400 && err instanceof SyntaxError && "body" in err) {
        return res.status(400).send({ error: "Invalid Request body" });
    }
    next();
});
// import all routers
(0, routes_1.default)(app);
// Add middleware to serve the Swagger docs
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// Start the server
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield index_1.sequelize.sync();
    console.log(`Server started on  ${port}`);
}));
// Export the Express API
exports.default = app;
//# sourceMappingURL=index.js.map