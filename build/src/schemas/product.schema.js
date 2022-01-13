"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductSchema = exports.deleteProductSchema = exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
const body = {
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({
            required_error: 'Title is required',
        }),
        description: (0, zod_1.string)({
            required_error: 'Description is required',
        }).min(120, "Description should be at least 120 characters long"),
        price: (0, zod_1.number)({
            required_error: 'Price is required',
        }).min(0, "Please provide a valid price.").positive("Minus Dollar . Are you out of a mind!"),
        image: (0, zod_1.string)({
            required_error: 'Image is required',
        }),
    }),
};
const params = {
    params: (0, zod_1.object)({
        productId: (0, zod_1.string)({
            required_error: 'productId is required',
        }),
    }),
};
exports.createProductSchema = (0, zod_1.object)(Object.assign({}, body));
exports.updateProductSchema = (0, zod_1.object)(Object.assign(Object.assign({}, body), params));
exports.deleteProductSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getProductSchema = (0, zod_1.object)(Object.assign({}, params));
