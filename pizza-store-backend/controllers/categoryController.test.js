const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const User = require('../models/User');
const Category = require('../models/Category');
const jwt = require('jsonwebtoken');

describe('Category Controller', () => {
  let adminToken;
  let customerToken;
  let categoryId;

  beforeEach(async () => {
    process.env.JWT_SECRET = 'testsecret';
    const admin = await User.create({ name: 'Admin', email: 'admin@t.com', password: '123', role: 'admin' });
    const customer = await User.create({ name: 'Cust', email: 'cust@t.com', password: '123', role: 'customer' });
    
    adminToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
    customerToken = jwt.sign({ id: customer._id }, process.env.JWT_SECRET);

    const category = await Category.create({ categoryName: 'Pizzas' });
    categoryId = category._id;
  });

  describe('POST /api/categories', () => {
    it('should allow admin to create category', async () => {
      const res = await request(app)
        .post('/api/categories')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ categoryName: 'Drinks' });

      expect(res.statusCode).to.equal(201);
      expect(res.body).to.have.property('categoryName', 'Drinks');
    });

    it('should deny customer from creating category', async () => {
      const res = await request(app)
        .post('/api/categories')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({ categoryName: 'Desserts' });

      expect(res.statusCode).to.equal(403);
    });
  });

  describe('GET /api/categories', () => {
    it('should get all categories', async () => {
      const res = await request(app).get('/api/categories');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(1);
    });
  });

  describe('PUT /api/categories/:id', () => {
    it('should allow admin to update category', async () => {
      const res = await request(app)
        .put(`/api/categories/${categoryId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ categoryName: 'Updated Pizza' });

      expect(res.statusCode).to.equal(200);
      expect(res.body.categoryName).to.equal('Updated Pizza');
    });
  });

  describe('DELETE /api/categories/:id', () => {
    it('should allow admin to delete category', async () => {
      const res = await request(app)
        .delete(`/api/categories/${categoryId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).to.equal(200);
      expect(res.body.message).to.equal('Category deleted');
    });
  });
});
