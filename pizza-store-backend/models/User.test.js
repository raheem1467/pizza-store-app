const { expect } = require('chai');
const User = require('./User');

describe('User Model', () => {
  it('should be invalid if name is empty', async () => {
    const user = new User({ email: 'test@test.com', password: 'password123' });
    let err;
    try {
      await user.validate();
    } catch (e) {
      err = e;
    }
    expect(err.errors.name).to.exist;
  });

  it('should be invalid if email is empty', async () => {
    const user = new User({ name: 'Test User', password: 'password123' });
    let err;
    try {
      await user.validate();
    } catch (e) {
      err = e;
    }
    expect(err.errors.email).to.exist;
  });

  it('should have customer as default role', () => {
    const user = new User({ name: 'Test', email: 'test@test.com', password: '123' });
    expect(user.role).to.equal('customer');
  });
});
