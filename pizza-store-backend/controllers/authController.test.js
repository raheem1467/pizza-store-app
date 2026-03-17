const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const User = require('../models/User');
const Otp = require('../models/Otp');

describe('Auth Controller', () => {
  beforeEach(async () => {
    process.env.JWT_SECRET = 'testsecret';
    await User.deleteMany({});
    await Otp.deleteMany({});
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      await Otp.create({ email: 'register@test.com', otp: '123456' });
      
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test Register',
          email: 'register@test.com',
          password: 'password123',
          phone: '1234567890',
          otp: '123456'
        });

      expect(res.statusCode).to.equal(201);
      expect(res.body).to.have.property('token');
      expect(res.body.user).to.have.property('email', 'register@test.com');
    });

    it('should not register user with existing email', async () => {
      await User.create({ name: 'User1', email: 'exist@test.com', password: '123' });
      await Otp.create({ email: 'exist@test.com', otp: '123456' });
      
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'User2',
          email: 'exist@test.com',
          password: '123',
          otp: '123456'
        });

      expect(res.statusCode).to.equal(400);
      expect(res.body.message).to.equal('User already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password123', salt);
      
      await User.create({
        name: 'Login User',
        email: 'login@test.com',
        password: hashedPassword
      });
    });

    it('should login valid user', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@test.com',
          password: 'password123'
        });

      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property('token');
      expect(res.body.user).to.have.property('email', 'login@test.com');
    });

    it('should return 400 for invalid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@test.com',
          password: 'wrongpassword'
        });

      expect(res.statusCode).to.equal(400);
      expect(res.body.message).to.equal('Invalid credentials');
    });
  });
});
