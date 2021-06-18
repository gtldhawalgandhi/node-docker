import { loginUser, storeUserImage } from '@app/controllers/user';
import { login, putImage } from '@app/services/user';
import  { scryptSync }  from 'crypto';
import jwt from 'jsonwebtoken';

jest.mock('@app/services/user');
jest.mock('crypto');
jest.mock('jsonwebtoken');

beforeEach(() => {
  scryptSync.mockImplementation(() => 'password');
  jwt.sign.mockImplementation(() => true);
});

describe('storeUserImage', () => {

  test('email password required', (done) => {

    putImage.mockImplementation(() => null);

    const res = {
      status: function () {

        return this;
      },
      json: (input = {}) => {
        if (input.ok === true) {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => { },
    };

    Buffer.from = () => ({
      toString: () => 'bb'
    });
    const req = {
      params: {
        id: '123'
      },
      files: {
        a: { data: 'b' }
      }
    };

    storeUserImage(req, res);
  });
});

describe('loginUser', () => {

  test('email password required', (done) => {

    const req = {
      body: {
        email: '',
        password: ''
      }
    };

    const res = {
      status: function () {

        return this;
      },
      json: (input = {}) => {
        if (input.err === 'Email and Password are required') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => { },
    };
    loginUser(req, res);
  });

  test('failed login', (done) => {

    login.mockImplementation(() => null);

    const req = {
      body: {
        email: 'myEmail',
        password: 'password'
      }
    };

    const res = {
      status: function () {

        return this;
      },
      json: (input = {}) => {
        if (input.err === 'Login failed!') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => { },
    };
    loginUser(req, res);
  });

  test('Auth_success', (done) => {

    login.mockImplementation(() => ([{
      password: 'password',
      _id: 'Id123'
    }]));

    const req = {
      body: {
        email: 'myEmail',
        password: 'password'
      }
    };

    const res = {
      status: function () {

        return this;
      },
      json: (input = {}) => {
        if (input.status === 'ok') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: function () {


        return this;
      },
    };
    loginUser(req, res);
  });
});