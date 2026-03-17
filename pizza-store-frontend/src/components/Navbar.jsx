import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/slices/authSlice";
import { fetchNotifications } from "../redux/slices/notificationSlice";
import { fetchCart } from "../redux/slices/cartSlice";
import logo from "../assets/logo.png";

import { useState, useEffect } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, role } = useSelector((state) => state.auth);
  const { unreadCount } = useSelector((state) => state.notifications);
  const { cart } = useSelector((state) => state.cart);

  const cartItemsCount = cart?.items?.length || 0;

  useEffect(() => {
    if (token && role === "customer") {
      dispatch(fetchNotifications());
      dispatch(fetchCart());
      const interval = setInterval(() => {
        dispatch(fetchNotifications());
      }, 10000); // Poll every 10 seconds
      return () => clearInterval(interval);
    }
  }, [token, role, dispatch]);

  const logout = () => {
    dispatch(logoutSuccess());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container">
        {/* LOGO */}
        <Link className="navbar-brand brand-logo d-flex align-items-center" to="/">
          <img src={logo} alt="Pizzeria" className="navbar-logo me-2" />
          <span>Pizzeria</span>
        </Link>

        {/* HAMBURGER TOGGLE */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-start align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-btn" to="/menu" onClick={() => setIsOpen(false)}>
                Menu
              </Link>
            </li>

            {token && role === "customer" && (
              <>
                <li className="nav-item">
                  <Link className="nav-btn" to="/cart" onClick={() => setIsOpen(false)}>
                    <span className="badge-wrapper">
                      Cart
                      {cartItemsCount > 0 && (
                        <span className="cart-badge">{cartItemsCount}</span>
                      )}
                    </span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-btn" to="/orders" onClick={() => setIsOpen(false)}>
                    Orders
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={`notification-link ${unreadCount > 0 ? "active-notification" : ""}`}
                    to="/notifications"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="badge-wrapper">
                      Notifications
                      {unreadCount > 0 && (
                        <span className="notification-badge">{unreadCount}</span>
                      )}
                    </span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-btn" to="/profile" onClick={() => setIsOpen(false)}>
                    Profile
                  </Link>
                </li>
              </>
            )}

            {token && role === "admin" && (
              <li className="nav-item">
                <Link className="admin-btn" to="/admin" onClick={() => setIsOpen(false)}>
                  Admin Panel
                </Link>
              </li>
            )}

            <li className="nav-item d-flex align-items-center mt-3 mt-lg-0">
              {token ? (
                <button className="logout-btn ms-lg-3" onClick={() => { logout(); setIsOpen(false); }}>
                  Logout
                </button>
              ) : (
                <Link className="login-btn ms-lg-3" to="/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;