const { expect } = require('chai');
const Payment = require('./Payment');
const mongoose = require('mongoose');

describe('Payment Model', () => {
  it('should have paymentStatus default to Pending', () => {
    const payment = new Payment({ orderId: new mongoose.Types.ObjectId(), userId: new mongoose.Types.ObjectId() });
    expect(payment.paymentStatus).to.equal('Pending');
  });

  it('should invalid paymentMethod not in enum', async () => {
    const payment = new Payment({ orderId: new mongoose.Types.ObjectId(), userId: new mongoose.Types.ObjectId(), paymentMethod: 'Crypto' });
    let err;
    try {
      await payment.validate();
    } catch (e) {
      err = e;
    }
    expect(err.errors.paymentMethod).to.exist;
  });
});
