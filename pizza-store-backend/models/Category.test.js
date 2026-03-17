const { expect } = require('chai');
const Category = require('./Category');

describe('Category Model', () => {
  it('should be invalid if categoryName is empty', async () => {
    const category = new Category();
    let err;
    try {
      await category.validate();
    } catch (e) {
      err = e;
    }
    expect(err.errors.categoryName).to.exist;
  });
});
