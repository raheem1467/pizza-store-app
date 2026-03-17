const { expect } = require('chai');
const Cart = require('./Cart');
const mongoose = require('mongoose');

describe('Cart Model', () => {
  it('should have totalAmount default to 0', () => {
    const cart = new Cart({ userId: new mongoose.Types.ObjectId() });
    expect(cart.totalAmount).to.equal(0);
  });
});
