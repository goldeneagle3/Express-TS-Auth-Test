"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateResource_1 = __importDefault(require("../middlewares/validateResource"));
const requireUser_1 = __importDefault(require("../middlewares/requireUser"));
const product_schema_1 = require("../schemas/product.schema");
const product_controller_1 = require("../controllers/product.controller");
const router = express_1.default.Router();
router.route('/').post([requireUser_1.default, (0, validateResource_1.default)(product_schema_1.createProductSchema)], product_controller_1.createProductHandler);
router
    .route('/api/products/:productId')
    .put([requireUser_1.default, (0, validateResource_1.default)(product_schema_1.updateProductSchema)], product_controller_1.updateProductHandler)
    .get((0, validateResource_1.default)(product_schema_1.getProductSchema), product_controller_1.getProductHandler)
    .delete([requireUser_1.default, (0, validateResource_1.default)(product_schema_1.deleteProductSchema)], product_controller_1.deleteProductHandler);
exports.default = router;
