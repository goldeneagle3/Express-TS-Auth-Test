import express from 'express';

import validate from '../middlewares/validateResource';
import requireUser from '../middlewares/requireUser';
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  listProductSchema,
  updateProductSchema,
} from '../schemas/product.schema';
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from '../controllers/product.controller';

const router = express.Router();

router
  .route('/')
  .post([requireUser, validate(createProductSchema)], createProductHandler)
  .get(validate(listProductSchema));

router
  .route('/:productId')
  .get(validate(getProductSchema), getProductHandler)
  .put([requireUser, validate(updateProductSchema)], updateProductHandler)
  .delete([requireUser, validate(deleteProductSchema)], deleteProductHandler);

export default router;
