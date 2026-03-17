const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const User = require('../models/User');
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const jwt = require('jsonwebtoken');

describe('Payment Controller', () => {
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

    const order = await Order.create({ userId: customerId, items: [], totalAmount: 50, paymentStatus: 'Pending' });
    orderId = order._id;
  });

  describe('POST /api/payments/pay', () => {
    it('should process payment and update order status', async () => {
      const res = await request(app)
        .post('/api/payments/pay')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({ orderId, paymentMethod: 'Card' });

      expect(res.statusCode).to.equal(200);
      expect(res.body.message).to.equal('Payment successful');
      expect(res.body.payment.paymentStatus).to.equal('Completed');

      const updatedOrder = await Order.findById(orderId);
      expect(updatedOrder.paymentStatus).to.equal('Paid');
    });

    it('should return 404 for non-existent order', async () => {
      const mongoose = require('mongoose');
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .post('/api/payments/pay')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({ orderId: fakeId, paymentMethod: 'Card' });

      expect(res.statusCode).to.equal(404);
    });
  });

  describe('GET /api/payments/mypayments', () => {
    it('should get user payments', async () => {
      await Payment.create({ orderId, userId: customerId, amount: 50, paymentMethod: 'Cash', paymentStatus: 'Completed' });
      const res = await request(app)
        .get('/api/payments/mypayments')
        .set('Authorization', `Bearer ${customerToken}`);

      expect(res.statusCode).to.equal(200);
      expect(res.body.length).to.equal(1);
    });
  });

  describe('GET /api/payments/all', () => {
    it('should allow admin to get all payments', async () => {
      await Payment.create({ orderId, userId: customerId, amount: 50, paymentMethod: 'Cash', paymentStatus: 'Completed' });
      const res = await request(app)
        .get('/api/payments/all')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).to.equal(200);
      expect(res.body.length).to.equal(1);
    });
  });
});
