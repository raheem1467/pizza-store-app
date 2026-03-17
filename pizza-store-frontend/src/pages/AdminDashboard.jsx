import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="admin-container container py-5">
      <div className="text-center mb-5 admin-header-section">
        <h2 className="admin-title display-4 fw-bold">👨‍💼 Admin Dashboard</h2>
        <p className="admin-subtitle lead text-muted">
          Control center for your Pizzeria operations.
        </p>
      </div>

      <div className="row g-4 justify-content-center">
        {/* Manage Menu */}
        <div className="col-md-6 col-lg-3">
          <div className="admin-card text-center p-4">
            <div className="admin-icon mb-3" style={{ fontSize: "3rem" }}>🍕</div>
            <h5 className="fw-bold mb-3">Manage Menu</h5>
            <p className="text-muted mb-4">
              Add new pizzas, update prices, or remove items from your menu.
            </p>
            <Link to="/admin/menu" className="btn btn-outline-danger rounded-pill px-4 fw-bold">
              Open Menu
            </Link>
          </div>
        </div>

        {/* Manage Orders */}
        <div className="col-md-6 col-lg-3">
          <div className="admin-card text-center p-4">
            <div className="admin-icon mb-3" style={{ fontSize: "3rem" }}>📦</div>
            <h5 className="fw-bold mb-3">Manage Orders</h5>
            <p className="text-muted mb-4">
              Track real-time orders, update status, and message customers.
            </p>
            <Link to="/admin/orders" className="btn btn-outline-danger rounded-pill px-4 fw-bold">
              View Orders
            </Link>
          </div>
        </div>

        {/* Manage Users */}
        <div className="col-md-6 col-lg-3">
          <div className="admin-card text-center p-4">
            <div className="admin-icon mb-3" style={{ fontSize: "3rem" }}>👥</div>
            <h5 className="fw-bold mb-3">Manage Users</h5>
            <p className="text-muted mb-4">
              View all registered users and manage their administrative roles.
            </p>
            <Link to="/admin/users" className="btn btn-outline-danger rounded-pill px-4 fw-bold">
              View Users
            </Link>
          </div>
        </div>

        {/* Revenue */}
        <div className="col-md-6 col-lg-3">
          <div className="admin-card text-center p-4">
            <div className="admin-icon mb-3" style={{ fontSize: "3rem" }}>💰</div>
            <h5 className="fw-bold mb-3">Revenue</h5>
            <p className="text-muted mb-4">
              Analyze your sales performance and monthly revenue generation.
            </p>
            <Link to="/admin/revenue" className="btn btn-outline-danger rounded-pill px-4 fw-bold">
              View Revenue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;