const { expect } = require('chai');
const { protect, admin } = require('./authMiddleware');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: function (s) {
        this.statusCode = s;
        return this;
      },
      json: function (data) {
        this.data = data;
        return this;
      }
    };
    next = () => {
      req.nextCalled = true;
    };
  });

  describe('protect()', () => {
    it('should return 401 if no token is provided', async () => {
      await protect(req, res, next);
      expect(res.statusCode).to.equal(401);
      expect(res.data.message).to.equal('No token');
    });

    it('should return 401 if invalid token is provided', async () => {
      req.headers.authorization = 'Bearer invalidtoken';
      await protect(req, res, next);
      expect(res.statusCode).to.equal(401);
      expect(res.data.message).to.equal('Not authorized');
    });

    it('should call next if valid token is provided', async () => {
      process.env.JWT_SECRET = 'testsecret';
      const user = new User({ name: 'Test', email: 'test@test.com', password: '123' });
      await user.save();
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      req.headers.authorization = `Bearer ${token}`;
      await protect(req, res, next);
      
      expect(req.nextCalled).to.be.true;
      expect(req.user._id.toString()).to.equal(user._id.toString());
    });
  });

  describe('admin()', () => {
    it('should call next if user is admin', () => {
      req.user = { role: 'admin' };
      admin(req, res, next);
      expect(req.nextCalled).to.be.true;
    });

    it('should return 403 if user is not admin', () => {
      req.user = { role: 'customer' };
      admin(req, res, next);
      expect(res.statusCode).to.equal(403);
      expect(res.data.message).to.equal('Admin only');
    });

    it('should return 403 if user is not defined', () => {
      admin(req, res, next);
      expect(res.statusCode).to.equal(403);
      expect(res.data.message).to.equal('Admin only');
    });
  });
});
