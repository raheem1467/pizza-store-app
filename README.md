# 🍕 Pizzeria - Premium Full-Stack Pizza Ordering System

## 🏗️ Technology Stack

### **Frontend**
- **Core**: React.js 19
- **State Management**: Redux Toolkit (Slices for Auth, Cart, Menu, Orders, Notifications, Admin)
- **Routing**: React Router DOM v7
- **Styling**: Premium Custom CSS & React Bootstrap
- **Validation**: Formik & Yup
- **Icons & UI**: React Icons & React Toastify

### **Backend**
- **Server**: Node.js & Express.js 5
- **Database**: MongoDB Atlas (Mongoose)
- **Authentication**: JWT & OTP-based Email Verification (**Nodemailer**)
- **File Storage**: **Multer** for Pizza Image Uploads
- **Security**: CORS, Role-based Access Control (RBAC), Bcryptjs

---

## 🚀 Installation & Setup

### 1. Prerequisites
- **Node.js** (v16+)
- **npm** (v8+)
- **MongoDB Atlas** account (or local MongoDB)

### 2. Backend Configuration
1.  Navigate to the backend: `cd pizza-store-backend`
2.  Install dependencies: `npm install`
3.  Configure environment: Create a `.env` file:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_atlas_uri
    JWT_SECRET=your_jwt_secret
    EMAIL_USER=your_gmail_address
    EMAIL_PASS=your_app_password
    ```
4.  **Seed the menu**: `npm run data:import`
5.  **Start server**: `npm run dev` (Runs on `http://localhost:5000`)

### 3. Frontend Configuration
1.  Navigate to the frontend: `cd pizza-store-frontend`
2.  Install dependencies: `npm install`
3.  **Start application**: `npm start` (Runs on `http://localhost:3000`)

---

## 🔑 Default Credentials
Use these to explore the Admin capabilities:
- **Admin**: `admin@example.com` / `password123`
- **Customer**: Use the Register page to create your own account (requires Email OTP).
                The OTP will also be shown in the console for easy testing.

---

## 🧪 Testing & Quality Assurance
- **Frontend Unit Tests**: `npm test` (Runs Jest/RTL tests for components/slices).
- **Backend API Tests**: `npm test` (Runs Mocha/Chai tests with MongoDB Memory Server).

---


## 👤 Author
**Rahim Shaik** - Pizzeria (Capstone Project)
*
