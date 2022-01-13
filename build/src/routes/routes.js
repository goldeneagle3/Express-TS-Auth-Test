"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = __importDefault(require("./user.routes"));
const session_routes_1 = __importDefault(require("./session.routes"));
function routes(app) {
    app.get("/", (req, res) => {
        res.send("Hello mfuckerssss..");
    });
    app.use('/api/v1/users', user_routes_1.default);
    app.use('/api/v1/sessions', session_routes_1.default);
}
exports.default = routes;
