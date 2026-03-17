const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const User = require('../models/User');
const MenuItem = require('../models/MenuItem');
const jwt = require('jsonwebtoken');

describe('Menu Controller', () => {
  let adminToken;
  let menuItemId;

  beforeEach(async () => {
    process.env.JWT_SECRET = 'testsecret';
    const admin = await User.create({ name: 'Admin', email: 'admin@t.com', password: '123', role: 'admin' });
    adminToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);

    const item = await MenuItem.create({
      name: 'Test Pizza',
      description: 'Test Desc',
      price: 15,
      category: 'Pizzas'
    });
    menuItemId = item._id;
  });

  describe('POST /api/menu', () => {
    it('should create menu item as admin', async () => {
      const res = await request(app)
        .post('/api/menu')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'New Pizza', price: 20, category: 'Pizzas' });

      expect(res.statusCode).to.equal(201);
      expect(res.body).to.have.property('name', 'New Pizza');
    });
  });

  describe('GET /api/menu', () => {
    it('should get all menu items', async () => {
      const res = await request(app).get('/api/menu');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(1);
    });
  });

  describe('PUT /api/menu/:id', () => {
    it('should update menu item as admin', async () => {
      const res = await request(app)
        .put(`/api/menu/${menuItemId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ price: 25 });

      expect(res.statusCode).to.equal(200);
      expect(res.body.price).to.equal(25);
    });
  });

  describe('DELETE /api/menu/:id', () => {
    it('should delete menu item as admin', async () => {
      const res = await request(app)
        .delete(`/api/menu/${menuItemId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).to.equal(200);
      expect(res.body.message).to.equal('Deleted successfully');
    });
  });
});
