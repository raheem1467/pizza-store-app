const { expect } = require('chai');
const Order = require('./Order');
const mongoose = require('mongoose');

describe('Order Model', () => {
  it('should have correct default statuses', () => {
    const order = new Order({ userId: new mongoose.Types.ObjectId() });
    expect(order.orderStatus).to.equal('Pending');
    expect(order.paymentStatus).to.equal('Pending');
  });

  it('should only accept valid enum values for deliveryMode', async () => {
    const order = new Order({ userId: new mongoose.Types.ObjectId(), deliveryMode: 'InvalidMode' });
    let err;
    try {
      await order.validate();
    } catch (e) {
      err = e;
    }
    expect(err.errors.deliveryMode).to.exist;
  });
});
