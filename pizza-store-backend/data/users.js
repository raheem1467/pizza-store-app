const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123', // This will be hashed in the seeder
    phone: '1234567890',
    role: 'admin',
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '0987654321',
    role: 'customer',
  },
];

module.exports = users;
