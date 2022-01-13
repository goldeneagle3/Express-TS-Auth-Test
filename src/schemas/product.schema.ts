import { number, object, string, TypeOf } from 'zod';

const body = {
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    description: string({
      required_error: 'Description is required',
    }).min(120, "Description should be at least 120 characters long"),
    price: number({
      required_error: 'Price is required',
    }).min(0, "Please provide a valid price.").positive("Minus Dollar . Are you out of a mind!"),
    image: string({
      required_error: 'Image is required',
    }),
  }),
}

const params = {
  params: object({
    productId: string({
      required_error: 'productId is required',
    }),
  }),
};

const query = {
  query: object({
    name: string(),
    price: number(),
  }),
};

export const createProductSchema = object({
  ...body,
});

export const updateProductSchema = object({
  ...body,
  ...params,
});

export const deleteProductSchema = object({
  ...params,
});

export const getProductSchema = object({
  ...params,
});

export const listProductSchema = object({
  ...query,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type ReadProductInput = TypeOf<typeof getProductSchema>;
export type ListProductInput = TypeOf<typeof listProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
