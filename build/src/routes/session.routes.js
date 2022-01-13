"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const session_schema_1 = require("./../schemas/session.schema");
const validateResource_1 = __importDefault(require("../middlewares/validateResource"));
const session_controller_1 = require("../controllers/session.controller");
const requireUser_1 = __importDefault(require("../middlewares/requireUser"));
const router = express_1.default.Router();
router
    .route('/')
    .post((0, validateResource_1.default)(session_schema_1.createSessionSchema), session_controller_1.createUserSessionHandler)
    .get(requireUser_1.default, session_controller_1.getUserSessionHandler)
    .delete(requireUser_1.default, session_controller_1.deleteSessionHandler);
exports.default = router;
