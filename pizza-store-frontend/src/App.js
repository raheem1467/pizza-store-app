import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMenu from "./pages/AdminMenu";
import AddPizza from "./pages/AddPizza";
import AdminOrders from "./pages/AdminOrders";
import Revenue from "./pages/Revenue";
import EditPizza from "./pages/EditPizza";
import AdminUsers from "./pages/AdminUsers";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";

import Navbar from "./components/Navbar";

function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/menu" element={<Menu />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/orders" element={<Orders />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/admin/menu" element={<AdminMenu />} />

        <Route path="/admin/add-pizza" element={<AddPizza />} />

        <Route path="/admin/orders" element={<AdminOrders />} />

        <Route path="/admin/users" element={<AdminUsers />} />

        <Route path="/admin/revenue" element={<Revenue />} />

        <Route path="/admin/edit/:id" element={<EditPizza />} />
        
        <Route path="/profile" element={<Profile />} />

        <Route path="/notifications" element={<Notifications />} />

      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />

    </BrowserRouter>
  );
}

export default App;