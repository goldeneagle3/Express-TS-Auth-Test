import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import Product, { ProductDocument } from '../models/product.model';

export async function createProduct(
  input: DocumentDefinition<Omit<ProductDocument, 'createdAt' | 'updatedAt' | 'productId'>>,
) {
  try {
    const result = await Product.create(input);
    return result;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function findProduct(query: FilterQuery<ProductDocument>, options: QueryOptions = { lean: true }) {
  try {
    const result = await Product.findOne(query, {}, options);
    return result;
  } catch (e) {
    throw e;
  }
}

export async function findProducts(query:FilterQuery, options: QueryOptions = { lean: true }) {
  interface Search {
    title: any;
    price: number;
  }
  let queryObj!: Search;
  if (query.title) {
    queryObj.title = { $regex: query.title, $options: 'i' };
  }
  if(query.price){
    queryObj.price = query.price
  }

  try {
    let result = await Product.find(queryObj,{},options)
    return result
  } catch (error) {
    throw error    
  }

}

export async function findAndUpdateProduct(
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions,
) {
  return Product.findOneAndUpdate(query, update, options);
}

export async function deleteProduct(query: FilterQuery<ProductDocument>) {
  return Product.deleteOne(query);
}
