const { expect } = require('chai');
const Message = require('./Message');
const mongoose = require('mongoose');

describe('Message Model', () => {
  it('should create message successfully', () => {
    const msg = new Message({ userId: new mongoose.Types.ObjectId(), orderId: new mongoose.Types.ObjectId(), message: 'Test message' });
    expect(msg.message).to.equal('Test message');
  });
});
