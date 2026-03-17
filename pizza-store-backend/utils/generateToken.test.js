const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const generateToken = require('./generateToken');

describe('generateToken utility', () => {
  before(() => {
    process.env.JWT_SECRET = 'testsecret';
  });

  it('should generate a valid JWT token', () => {
    const id = '12345';
    const token = generateToken(id);

    expect(token).to.be.a('string');
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded.id).to.equal(id);
    expect(decoded).to.have.property('exp');
    expect(decoded).to.have.property('iat');
  });
});
