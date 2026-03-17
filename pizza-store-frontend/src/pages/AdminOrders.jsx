import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders, updateOrderStatus } from "../redux/slices/adminSlice";
import { toast } from "react-toastify";

function AdminOrders() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.admin);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showBill, setShowBill] = useState(false);
  const [customMessages, setCustomMessages] = useState({}); // Track custom messages per order
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusUpdate = async (id, status) => {
    const message = customMessages[id] || "";
    const resultAction = await dispatch(updateOrderStatus({ id, status, message }));
    if (updateOrderStatus.fulfilled.match(resultAction)) {
      toast.success(`Order marked as ${status}`);
      // Clear message for this order
      setCustomMessages(prev => ({ ...prev, [id]: "" }));
    } else {
      toast.error(resultAction.payload || "Error updating order");
    }
  };

  const handleMessageChange = (id, val) => {
    setCustomMessages(prev => ({ ...prev, [id]: val }));
  };

  const handleViewBill = (order) => {
    setSelectedOrder(order);
    setShowBill(true);
  };

  const filteredOrders = activeFilter === "All" 
    ? orders 
    : orders.filter(o => o.orderStatus === activeFilter);

  const filterOptions = ["All", "Pending", "Accepted", "Preparing", "Delivered", "Rejected", "Cancelled"];

  return (
    <div className="container mt-4 mb-5">
      <div className="admin-header-section text-center mb-5">
        <h2 className="display-5 fw-bold mb-2">Order Management 📦</h2>
        <p className="text-muted">Process customer orders and manage status updates seamlessly.</p>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar-container mb-4">
        <div className="d-flex flex-wrap justify-content-center gap-2">
          {filterOptions.map(filter => (
            <button
              key={filter}
              className={`filter-pill ${activeFilter === filter ? "active" : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
              <span className="count-badge ms-2">
                {filter === "All" ? orders.length : orders.filter(o => o.orderStatus === filter).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Orders Grid */}
      <div className="row g-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div className="col-lg-6 col-xl-4" key={order._id}>
              <div className="admin-order-card">
                <div className="card-header-premium d-flex justify-content-between align-items-center">
                  <span className="order-id-chip">#{order._id.slice(-6)}</span>
                  <span className={`status-badge-v2 ${order.orderStatus.toLowerCase()}`}>
                    {order.orderStatus}
                  </span>
                </div>

                <div className="card-body-premium">
                  <div className="customer-preview mb-3">
                    <h5 className="mb-0 text-dark fw-bold">{order.userId?.name || "Guest"}</h5>
                    <p className="small text-muted mb-0">{order.userId?.email || "No email"}</p>
                  </div>

                  <div className="order-details-summary p-3 bg-light rounded mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-muted small">Items:</span>
                      <span className="fw-bold small">{order.items.reduce((acc, curr) => acc + curr.quantity, 0)} items</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted small">Total:</span>
                      <span className="text-danger fw-bold">₹ {order.totalAmount}</span>
                    </div>
                  </div>

                  <div className="messaging-section mb-3">
                    <div className="input-group input-group-sm">
                      <textarea
                        className="form-control premium-input"
                        placeholder="Add a custom note..."
                        value={customMessages[order._id] || ""}
                        onChange={(e) => handleMessageChange(order._id, e.target.value)}
                        rows="1"
                        disabled={["Delivered", "Rejected", "Cancelled"].includes(order.orderStatus)}
                      />
                      <button 
                        className="btn btn-dark premium-send-btn"
                        onClick={() => handleStatusUpdate(order._id, order.orderStatus)}
                        disabled={!customMessages[order._id] || ["Delivered", "Rejected", "Cancelled"].includes(order.orderStatus)}
                      >
                       ✉️
                      </button>
                    </div>
                  </div>

                  <div className="card-actions-premium d-flex flex-wrap gap-2 pt-3 border-top">
                    <button
                      className="btn btn-outline-secondary btn-sm flex-grow-1 py-2"
                      onClick={() => handleViewBill(order)}
                    >
                      View Bill
                    </button>

                    {order.orderStatus === "Pending" && (
                      <>
                        <button
                          className="btn btn-success btn-sm flex-grow-1 py-2"
                          onClick={() => handleStatusUpdate(order._id, "Accepted")}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-danger btn-sm flex-grow-1 py-2"
                          onClick={() => handleStatusUpdate(order._id, "Rejected")}
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {order.orderStatus === "Accepted" && (
                      <button
                        className="btn btn-warning btn-sm flex-grow-1 py-2"
                        onClick={() => handleStatusUpdate(order._id, "Preparing")}
                      >
                        Start Prep
                      </button>
                    )}

                    {order.orderStatus === "Preparing" && (
                      <button
                        className="btn btn-primary btn-sm flex-grow-1 py-2"
                        onClick={() => handleStatusUpdate(order._id, "Delivered")}
                      >
                        Deliver
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <div className="no-orders-illustration mb-3" style={{fontSize: "4rem"}}>📭</div>
            <h3>No {activeFilter === "All" ? "" : activeFilter} orders found</h3>
            <p className="text-muted">Everything is up to date!</p>
          </div>
        )}
      </div>

      {/* View Bill Modal (Consistent with User side) */}
      {showBill && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowBill(false)}>
          <div className="modal-content-custom" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-custom">
              <h4 className="mb-0">Customer Bill</h4>
              <button className="close-btn-custom" onClick={() => setShowBill(false)}>
                &times;
              </button>
            </div>
            <div className="modal-body-custom">
              <div className="customer-info mb-3 p-2 bg-light rounded">
                <p className="mb-0 fw-bold">{selectedOrder.userId?.name}</p>
                <p className="mb-0 small text-muted">{selectedOrder.userId?.phone}</p>
                <p className="mb-0 small text-muted">{selectedOrder.userId?.address}</p>
              </div>
              <p className="mb-1 text-muted small">Order ID: #{selectedOrder._id}</p>
              <p className="mb-3 text-muted small">Date: {new Date(selectedOrder.createdAt).toLocaleString()}</p>

              <table className="table table-borderless">
                <thead>
                  <tr className="border-bottom">
                    <th>Item</th>
                    <th className="text-center">Qty</th>
                    <th className="text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        {item.name} <br />
                        <small className="text-muted">₹ {item.price}</small>
                      </td>
                      <td className="text-center">x{item.quantity}</td>
                      <td className="text-end fw-bold">₹ {item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="border-top pt-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Total Amount</h5>
                <h4 className="mb-0 text-danger fw-bold">₹ {selectedOrder.totalAmount}</h4>
              </div>
            </div>
            <div className="modal-footer-custom">
              <button className="btn btn-danger w-100 py-2 fw-bold" onClick={() => setShowBill(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;