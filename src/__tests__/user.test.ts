import mongoose from 'mongoose';
import request from 'supertest';

import createServer from '../utils/server';
import * as UserService from './../services/user.service';
import * as SessionService from './../services/session.service';
import supertest from 'supertest';
import { createUserSessionHandler } from '../controllers/session.controller';

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  _id: userId,
  email: 'jane.doe@example.com',
  name: 'Jane Doe',
};

const userInput = {
  email: 'test@example.com',
  name: 'Jane Doe',
  password: 'Password123',
  passwordConfirmation: 'Password123',
};

const sessionPayload = {
  _id: new mongoose.Types.ObjectId().toString(),
  user: userId,
  valid: true,
  userAgent: 'PostmanRuntime/7.28.4',
  createdAt: new Date('2021-09-30T13:31:07.674Z'),
  updatedAt: new Date('2021-09-30T13:31:07.674Z'),
  __v: 0,
};

describe('user', () => {
  // Registration
  describe('user registartion', () => {
    // get validation
    describe('with username and password are valid', () => {
      it('should return user payload', async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, 'createUser')
          //  @ts-ignore
          .mockReturnValueOnce(userPayload);
        //
        const { statusCode, body } = await supertest(app).post('/api/v1/users').send(userInput);

        expect(statusCode).toBe(200);
        expect(body).toBeTruthy();
        expect(body).toEqual(userPayload);

        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });

    // check if passwords match
    describe('with password aint match', () => {
      it('should return 400', async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, 'createUser')
          //  @ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode, body } = await supertest(app)
          .post('/api/v1/users')
          .send({ ...userInput, passwordConfirmation: 'dkajdkadjw' });

        expect(statusCode).toBe(400);
        expect(body[0].message).toBe('Password do not match');
        console.log(body[0].message);

        expect(createUserServiceMock).not.toHaveBeenCalled();
      });
    });

    // check if error handlers working
    describe('user service errors', () => {
      it('should return 409', async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, 'createUser')
          // @ts-ignore
          .mockRejectedValueOnce('gibberish');

        const { statusCode } = await supertest(app).post('/api/v1/users').send(userInput);

        expect(statusCode).toBe(409);
        expect(createUserServiceMock).toHaveBeenCalled();
      });
    });
  });

  // Create Sessions
  describe('create user sesion', () => {
    // Valid login
    describe('valid login', () => {
      it('should return a signed accessToken & refreshToken', async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, 'validatePassword')
          //  @ts-ignore
          .mockReturnValue(userPayload);

        jest
          .spyOn(SessionService, 'createSession')
          //  @ts-ignore
          .mockReturnValue(sessionPayload);

        const req = {
          get: () => {
            return 'a user agent';
          },
          body: {
            email: 'test@example.com',
            password: 'Password123',
          },
        };

        const send = jest.fn();

        const res = {
          send,
        };
        // @ts-ignore
        await createUserSessionHandler(req, res);

        expect(send).toHaveBeenCalledWith({
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        });
      });
    });
  });
});
