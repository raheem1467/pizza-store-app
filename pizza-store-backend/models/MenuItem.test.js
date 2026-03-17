const { expect } = require('chai');
const MenuItem = require('./MenuItem');

describe('MenuItem Model', () => {
  it('should be invalid if required fields are missing', async () => {
    const menuItem = new MenuItem({ description: 'Delicious pizza' });
    let err;
    try {
      await menuItem.validate();
    } catch (e) {
      err = e;
    }
    expect(err.errors.name).to.exist;
    expect(err.errors.price).to.exist;
    expect(err.errors.category).to.exist;
  });

  it('should have default values for image and isAvailable', () => {
    const menuItem = new MenuItem({ name: 'Pizza', price: 10, category: 'Pizza' });
    expect(menuItem.image).to.equal('https://images.unsplash.com/photo-1601924582975-7e7f5f9f3e33');
    expect(menuItem.isAvailable).to.be.true;
  });
});
