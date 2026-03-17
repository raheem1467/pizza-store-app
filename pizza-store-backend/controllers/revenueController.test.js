const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const User = require('../models/User');
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');

describe('Revenue Controller', () => {
  let adminToken;

  beforeEach(async () => {
    process.env.JWT_SECRET = 'testsecret';
    const admin = await User.create({ name: 'Admin', email: 'admin@t.com', password: '123', role: 'admin' });
    adminToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);

    const customer = await User.create({ name: 'Cust', email: 'cust@t.com', password: '123' });

    // Create delivered, paid orders to calculate revenue
    await Order.create({
      userId: customer._id,
      items: [],
      totalAmount: 100,
      orderStatus: 'Delivered',
      paymentStatus: 'Paid'
    });
  });

  describe('GET /api/revenue/monthly', () => {
    it('should get correct revenue data', async () => {
      const res = await request(app)
        .get('/api/revenue/monthly')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).to.equal(200);
      expect(res.body.totalRevenue).to.equal(100);
      expect(res.body.monthlyRevenue).to.equal(100);
      expect(res.body.totalOrders).to.equal(1);
    });
  });
});
