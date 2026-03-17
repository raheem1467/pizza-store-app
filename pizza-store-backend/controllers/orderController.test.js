const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const User = require('../models/User');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const MenuItem = require('../models/MenuItem');
const jwt = require('jsonwebtoken');

describe('Order Controller', () => {
  let customerToken;
  let adminToken;
  let customerId;
  let menuItemId;

  beforeEach(async () => {
    process.env.JWT_SECRET = 'testsecret';
    const customer = await User.create({ name: 'Cust', email: 'cust@t.com', password: '123' });
    customerId = customer._id;
    customerToken = jwt.sign({ id: customer._id }, process.env.JWT_SECRET);

    const admin = await User.create({ name: 'Admin', email: 'admin@t.com', password: '123', role: 'admin' });
    adminToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);

    const item = await MenuItem.create({ name: 'Pizza', price: 10, category: 'Pizzas' });
    menuItemId = item._id;
  });

  describe('POST /api/orders/place', () => {
    it('should place an order from cart', async () => {
      await Cart.create({
        userId: customerId,
        items: [{ itemId: menuItemId, name: 'Pizza', price: 10, quantity: 2 }],
        totalAmount: 20
      });

      const res = await request(app)
        .post('/api/orders/place')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({ deliveryMode: 'Delivery' });

      expect(res.statusCode).to.equal(200);
      expect(res.body.deliveryMode).to.equal('Delivery');
      expect(res.body.totalAmount).to.equal(20);
      expect(res.body.items.length).to.equal(1);

      // Verify cart is empty
      const cart = await Cart.findOne({ userId: customerId });
      expect(cart).to.be.null;
    });

    it('should fail if cart is empty', async () => {
      const res = await request(app)
        .post('/api/orders/place')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({ deliveryMode: 'Delivery' });

      expect(res.statusCode).to.equal(400);
      expect(res.body.message).to.equal('Cart is empty');
    });
  });

  describe('GET /api/orders/myorders', () => {
    it('should get user orders', async () => {
      await Order.create({ userId: customerId, items: [], totalAmount: 0 });
      const res = await request(app)
        .get('/api/orders/myorders')
        .set('Authorization', `Bearer ${customerToken}`);

      expect(res.statusCode).to.equal(200);
      expect(res.body.length).to.equal(1);
    });
  });

  describe('GET /api/orders/all', () => {
    it('should allow admin to get all orders', async () => {
      await Order.create({ userId: customerId, items: [], totalAmount: 0 });
      const res = await request(app)
        .get('/api/orders/all')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).to.equal(200);
      expect(res.body.length).to.equal(1);
    });
  });

  describe('PUT /api/orders/cancel/:id', () => {
    it('should allow cancelling pending order', async () => {
      const order = await Order.create({ userId: customerId, items: [], totalAmount: 0, orderStatus: 'Pending' });
      const res = await request(app)
        .put(`/api/orders/cancel/${order._id}`)
        .set('Authorization', `Bearer ${customerToken}`);

      expect(res.statusCode).to.equal(200);
      expect(res.body.orderStatus).to.equal('Cancelled');
    });

    it('should not allow cancelling non-pending order', async () => {
      const order = await Order.create({ userId: customerId, items: [], totalAmount: 0, orderStatus: 'Preparing' });
      const res = await request(app)
        .put(`/api/orders/cancel/${order._id}`)
        .set('Authorization', `Bearer ${customerToken}`);

      expect(res.statusCode).to.equal(400);
      expect(res.body.message).to.include('cannot be cancelled');
    });
  });

  describe('PUT /api/orders/status/:id', () => {
    it('should allow admin to update order status', async () => {
      const order = await Order.create({ userId: customerId, items: [], totalAmount: 0, orderStatus: 'Pending' });
      const res = await request(app)
        .put(`/api/orders/status/${order._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'Preparing' });

      expect(res.statusCode).to.equal(200);
      expect(res.body.orderStatus).to.equal('Preparing');
    });
  });
});
