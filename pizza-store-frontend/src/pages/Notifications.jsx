import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNotifications, clearNotifications, deleteAllNotifications } from "../redux/slices/notificationSlice";
import { toast } from "react-toastify";

function Notifications() {
  const { items, loading } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleMarkRead = () => {
    dispatch(clearNotifications());
    toast.info("All marked as read");
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all notification history?")) {
      dispatch(deleteAllNotifications());
      toast.error("Notification history cleared");
    }
  };

  const getStatusIcon = (message) => {
    if (message.includes("Accepted")) return "✅";
    if (message.includes("Delivering")) return "🛵";
    if (message.includes("Delivered")) return "🍕";
    if (message.includes("Rejected") || message.includes("Cancelled")) return "❌";
    return "🔔";
  };

  if (loading && items.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0">Notifications</h2>
            <div className="d-flex gap-2">
              <button 
                className="btn btn-sm btn-outline-secondary" 
                onClick={handleMarkRead}
                disabled={items.length === 0}
              >
                Mark all as read
              </button>
              <button 
                className="btn btn-sm btn-outline-danger" 
                onClick={handleClearAll}
                disabled={items.length === 0}
              >
                Clear history
              </button>
            </div>
          </div>

          <div className="card notification-card overflow-hidden">
            <div className="list-group list-group-flush">
              {items.length === 0 ? (
                <div className="p-5 text-center text-muted">
                  <div className="mb-3" style={{ fontSize: "4rem" }}>🔔</div>
                  <h5 className="fw-bold">All caught up!</h5>
                  <p className="small px-4">When your pizza starts its journey, we'll let you know right here.</p>
                </div>
              ) : (
                items.map((n) => (
                  <div 
                    key={n._id} 
                    className={`list-group-item border-0 p-4 transition-all ${!n.isRead ? "bg-light-danger border-start border-4 border-danger" : ""}`}
                    style={{ borderBottom: "1px solid #f1f1f1" }}
                  >
                    <div className="d-flex w-100 justify-content-between align-items-center">
                      <div className="d-flex gap-4 align-items-center">
                        <div 
                          className="status-icon-wrapper rounded-circle d-flex align-items-center justify-content-center shadow-sm" 
                          style={{ 
                            width: "54px", 
                            height: "54px", 
                            background: n.isRead ? "#ffffff" : "white", 
                            fontSize: "1.6rem",
                            border: n.isRead ? "1px solid #eee" : "2px solid #da291c"
                          }}
                        >
                          {getStatusIcon(n.message)}
                        </div>
                        <div>
                          <p className={`mb-1 ${!n.isRead ? "fw-bold text-dark" : "text-secondary"}`} style={{ fontSize: "1rem", lineHeight: "1.5" }}>
                            {n.message}
                          </p>
                          <div className="d-flex align-items-center gap-3 mt-1">
                            <small className="text-muted opacity-75 d-flex align-items-center gap-1">
                              📅 {new Date(n.createdAt).toLocaleDateString()}
                            </small>
                            <small className="text-muted opacity-75 d-flex align-items-center gap-1">
                              ⏰ {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </small>
                          </div>
                        </div>
                      </div>
                      {!n.isRead && (
                        <div className="ms-3">
                           <span className="badge rounded-pill bg-danger shadow-sm px-3 py-2" style={{ letterSpacing: "1px" }}>NEW</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
