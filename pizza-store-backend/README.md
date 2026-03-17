# Pizza Store Backend 🍕

The backend engine for the Pizzeria application, built with Node.js, Express, and MongoDB.

## 🚀 Features
- **User Authentication**: JWT-based login and registration (Admin & Customer roles).
- **Menu Management**: Full CRUD for menu items.
- **Cart & Orders**: Logic for managing carts and processing pizza orders.
- **Notifications**: System for notifying users about order updates.
- **Seeding System**: Easy database setup with sample data.
- **Automated Testing**: Comprehensive unit tests for all core modules.

## 🛠️ Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Security**: Bcryptjs (Password Hashing) & JWT (Authentication)
- **Validation**: Formik & Yup (on frontend)
- **Testing**: Mocha & Chai

## 📦 Installation

1. **Clone the repository** (if not already local).
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up Environment Variables**:
   Create a `.env` file in the root folder:
   ```env
   MONGO_URI=your_mongodb_atlas_uri
   PORT=5000
   JWT_SECRET=your_secret_key
   ```

## 🗄️ Database Seeding

To quickly set up the database with menu items and an admin account:

- **Safe Import** (Adds missing items only):
  ```bash
  npm run data:import
  ```
- **Clean Import** (Wipes DB and starts fresh):
  ```bash
  npm run data:clean
  ```

**Default Admin Credentials:**
- **Email**: `admin@example.com`
- **Password**: `password123`

## 🏃 Running the Application

- **Development Mode**:
  ```bash
  npm run dev
  ```
- **Production Mode**:
  ```bash
  npm start
  ```

## 🧪 Testing

Run the automated test suite:
```bash
npm test
```

## 🏗️ Folder Structure
- `/config`: Database and server configurations.
- `/controllers`: Request handling logic.
- `/models`: Mongoose schemas.
- `/routes`: API endpoint definitions.
- `/middleware`: Authentication and error handling.
- `/data`: Sample seed data.
- `/utils`: Helper functions.
