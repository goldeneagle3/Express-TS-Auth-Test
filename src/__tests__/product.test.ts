import request from 'supertest';

import { connect, disconnect, clearDB } from './db';
import createServer from '../utils/server';
import mongoose from 'mongoose';
import { createProduct, findAndUpdateProduct } from '../services/product.service';
import { signJwt } from '../utils/jwt.utils';
import config from 'config';
import { get } from 'lodash';

const app = createServer();

beforeAll(async () => await connect());

afterEach(async () => await clearDB());

afterAll(async () => await disconnect());

const userId = new mongoose.Types.ObjectId().toString();

// Exmpl Product
export const productPayload = {
  user: userId,
  title: 'Canon EOS 1500D DSLR Camera with 18-55mm Lens',
  description:
    'Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.',
  price: 879.99,
  image: 'https://i.imgur.com/QlRphfQ.jpg',
};

export const updatedProductPayload = {
  user: userId,
  title: 'Changed Canon EOS 1500D DSLR Camera with 18-55mm Lens',
  description:
    'Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.',
  price: 879.99,
  image: 'https://i.imgur.com/QlRphfQ.jpg',
};

export const missingProductPayload = {
  user: userId,
  title: '',
  description:
    'Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.',
  price: 879.99,
  image: 'https://i.imgur.com/QlRphfQ.jpg',
};

// Exmpl User
export const userPayload = {
  _id: userId,
  email: 'ensar.ezber@example.com',
  name: 'Ensar Ezber',
};

describe('product', () => {
  describe('get product', () => {
    describe('given product not exist', () => {
      it('should return 404', async () => {
        const productId = '213';

        await request(app).get(`/api/v1/products/${productId}`).expect(404);
      });
    });

    describe('given product exist', () => {
      it('should return 200', async () => {
        const product = await createProduct(productPayload);

        const { body, statusCode } = await request(app).get(`/api/v1/products/${product.productId}`).expect(200);
        expect(statusCode).toBe(200);
      });
    });
  });

  describe('create product route', () => {

    describe('given the user is not logged in', () => {
      it('should return a 403', async () => {
        const { statusCode } = await request(app).post('/api/v1/products').send(productPayload);

        expect(statusCode).toBe(403);
      });
    });

    describe('given the user is not logged in', () => {
      it('should return 200 and create the post given', async () => {
        const jwt = signJwt(userPayload);

        const { statusCode, body } = await request(app)
          .post('/api/v1/products')
          .set('Authorization', `Bearer ${jwt}`)
          .send(productPayload);

        expect(statusCode).toBe(200);
        expect(body.price).toBe(productPayload.price);
        expect(body.title).toBe(productPayload.title);
        expect(body.description).toBeTruthy();
        expect(body.description).toBe(productPayload.description);
        expect(body.user).toBe(userId);
      });
    });
  });

  describe('update product route', () => {
    describe('given the user is not logged in', () => {
      it('should return a 403', async () => {
        const product = await createProduct(productPayload);

        const { statusCode } = await request(app)
          .put('/api/v1/products/' + product.productId)
          .send(updatedProductPayload);

        expect(statusCode).toBe(403);
      });
    });

    describe('given the user is logged in', () => {
      it('should return 200 and create the post given', async () => {
        const product = await createProduct(productPayload);
        const jwt = signJwt(userPayload);

        const { statusCode, body } = await request(app)
          .put('/api/v1/products/' + product.productId)
          .set('Authorization', `Bearer ${jwt}`)
          .send(updatedProductPayload);

        expect(statusCode).toBe(200);
        expect(body.price).toBe(productPayload.price);
        expect(body.title).toBe(updatedProductPayload.title);
        expect(body.description).toBeTruthy();
        expect(body.description).toBe(productPayload.description);
        expect(body.user).toBe(userId);
      });
    });
  });
});
