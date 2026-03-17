const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const User = require('../models/User');
const Order = require('../models/Order');
const Message = require('../models/Message');
const jwt = require('jsonwebtoken');

describe('Message Controller', () => {
  let customerToken;
  let adminToken;
  let customerId;
  let orderId;

  beforeEach(async () => {
    process.env.JWT_SECRET = 'testsecret';
    const customer = await User.create({ name: 'Cust', email: 'cust@t.com', password: '123' });
    customerId = customer._id;
    customerToken = jwt.sign({ id: customer._id }, process.env.JWT_SECRET);

    const admin = await User.create({ name: 'Admin', email: 'admin@t.com', password: '123', role: 'admin' });
    adminToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);

    const order = await Order.create({ userId: customerId, items: [], totalAmount: 0 });
    orderId = order._id;
  });

  describe('POST /api/messages/send', () => {
    it('should send a message', async () => {
      const res = await request(app)
        .post('/api/messages/send')
        .set('Authorization', `Bearer ${adminToken}`) // message sending explicitly checks admin role
        .send({ userId: customerId, orderId, message: 'Where is my pizza?' });

      expect(res.statusCode).to.equal(200);
      expect(res.body.message).to.equal('Where is my pizza?');
    });
  });

  describe('GET /api/messages/my', () => {
    it('should get user messages', async () => {
      await Message.create({ userId: customerId, orderId, message: 'Test Msg' });
      const res = await request(app)
        .get('/api/messages/my')
        .set('Authorization', `Bearer ${customerToken}`);

      expect(res.statusCode).to.equal(200);
      expect(res.body.length).to.equal(1);
      expect(res.body[0].message).to.equal('Test Msg');
    });
  });
});
