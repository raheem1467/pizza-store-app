require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const MenuItem = require('./models/MenuItem');
const users = require('./data/users');
const menuItems = require('./data/menuItems');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

const importData = async () => {
  try {
    const isClean = process.argv.includes('-c') || process.argv.includes('--clean');

    if (isClean) {
      console.log('Clean mode active: Deleting existing users and menu items...');
      await User.deleteMany();
      await MenuItem.deleteMany();
    } else {
      console.log('Safe mode active: Adding missing records only (no data will be deleted)...');
    }

    console.log('Seeding users...');
    let usersCreated = 0;
    for (const user of users) {
      const userExists = await User.findOne({ email: user.email });
      if (!userExists) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        await User.create({ ...user, password: hashedPassword });
        usersCreated++;
      }
    }

    console.log('Seeding menu items...');
    let itemsCreated = 0;
    for (const item of menuItems) {
      const itemExists = await MenuItem.findOne({ name: item.name });
      if (!itemExists) {
        await MenuItem.create(item);
        itemsCreated++;
      }
    }

    console.log(`\nImport Status:`);
    console.log(`- Users created: ${usersCreated}`);
    console.log(`- Menu items created: ${itemsCreated}`);

    if (usersCreated > 0 || !isClean) {
      console.log(`\nAdmin Login Details:`);
      console.log(`Email: admin@example.com`);
      console.log(`Password: password123`);
    }

    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await MenuItem.deleteMany();
    console.log('Successfully destroyed existing data!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
