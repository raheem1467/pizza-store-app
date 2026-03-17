import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, updateUserRole } from "../redux/slices/adminSlice";
import { toast } from "react-toastify";

function AdminUsers() {
  const dispatch = useDispatch();
  const { users, status } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleRoleChange = (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "customer" : "admin";
    if (window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      dispatch(updateUserRole({ id: userId, role: newRole }))
        .unwrap()
        .then(() => toast.success("User role updated successfully!"))
        .catch((err) => toast.error(err.message || "Failed to update role"));
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5 admin-header-section">
        <div>
          <h2 className="fw-bold mb-1">👥 User Management</h2>
          <p className="text-muted">View and manage all registered users.</p>
        </div>
        <div className="d-flex gap-3">
          <div className="search-bar-wrapper mb-0" style={{ width: "300px" }}>
            <input
              type="text"
              className="form-control premium-input shadow-sm"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="form-select premium-input shadow-sm"
            style={{ width: "150px" }}
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admins</option>
            <option value="customer">Customers</option>
          </select>
        </div>
      </div>

      <div className="custom-table-container shadow-sm rounded-4 overflow-hidden border">
        <table className="table table-hover mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th className="px-4 py-3">User Name</th>
              <th className="px-4 py-3">Email Address</th>
              <th className="px-4 py-3">Current Role</th>
              <th className="px-4 py-3 text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {status === "loading" ? (
              <tr>
                <td colSpan="4" className="text-center py-5">
                  <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-3 fw-semibold">{user.name}</td>
                  <td className="px-4 py-3 text-muted">{user.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`status-badge-v2 ${
                        user.role === "admin" ? "preparing" : "delivered"
                      }`}
                      style={{ fontSize: "0.7rem" }}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-end">
                    <button
                      className={`btn btn-sm ${
                        user.role === "admin" ? "btn-outline-danger" : "btn-outline-primary"
                      } rounded-pill px-3`}
                      onClick={() => handleRoleChange(user._id, user.role)}
                    >
                      Set as {user.role === "admin" ? "Customer" : "Admin"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-5 text-muted">
                  No users found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;
