const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const User = require('../models/User');
const MenuItem = require('../models/MenuItem');
const Cart = require('../models/Cart');
const jwt = require('jsonwebtoken');

describe('Cart Controller', () => {
  let customerToken;
  let customerId;
  let menuItemId;

  beforeEach(async () => {
    process.env.JWT_SECRET = 'testsecret';
    const customer = await User.create({ name: 'Cust', email: 'cust@t.com', password: '123' });
    customerId = customer._id;
    customerToken = jwt.sign({ id: customer._id }, process.env.JWT_SECRET);

    const item = await MenuItem.create({ name: 'Pizza', price: 10, category: 'Pizzas' });
    menuItemId = item._id;
  });

  describe('POST /api/cart/add', () => {
    it('should add item to cart', async () => {
      const res = await request(app)
        .post('/api/cart/add')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({ itemId: menuItemId.toString(), quantity: 2 });

      expect(res.statusCode).to.equal(200);
      expect(res.body.items.length).to.equal(1);
      expect(res.body.items[0].quantity).to.equal(2);
      expect(res.body.totalAmount).to.equal(20);
    });

    it('should return 404 if item not found', async () => {
      const mongoose = require('mongoose');
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .post('/api/cart/add')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({ itemId: fakeId.toString(), quantity: 1 });

      expect(res.statusCode).to.equal(404);
    });
  });

  describe('GET /api/cart', () => {
    it('should get user cart', async () => {
      await Cart.create({ userId: customerId, items: [], totalAmount: 0 });
      const res = await request(app)
        .get('/api/cart')
        .set('Authorization', `Bearer ${customerToken}`);

      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property('userId', customerId.toString());
    });
  });

  describe('DELETE /api/cart/remove/:itemId', () => {
    it('should remove item from cart', async () => {
      await Cart.create({
        userId: customerId,
        items: [{ itemId: menuItemId, name: 'Pizza', price: 10, quantity: 2 }],
        totalAmount: 20
      });

      const res = await request(app)
        .delete(`/api/cart/remove/${menuItemId}`)
        .set('Authorization', `Bearer ${customerToken}`);

      expect(res.statusCode).to.equal(200);
      expect(res.body.items.length).to.equal(0);
      expect(res.body.totalAmount).to.equal(0);
    });
  });

  describe('DELETE /api/cart/clear', () => {
    it('should clear cart', async () => {
      await Cart.create({ userId: customerId, items: [], totalAmount: 0 });
      const res = await request(app)
        .delete('/api/cart/clear')
        .set('Authorization', `Bearer ${customerToken}`);

      expect(res.statusCode).to.equal(200);
      expect(res.body.message).to.equal('Cart cleared');
    });
  });
});
