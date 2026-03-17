import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders, cancelUserOrder, updatePreviousOrders } from "../redux/slices/orderSlice";
import { toast } from "react-toastify";

function Orders(){

const dispatch = useDispatch();
const { orders: redOrders, previousOrders: redPrevOrders, status } = useSelector((state) => state.orders);
const [selectedOrder, setSelectedOrder] = useState(null);
const [showBill, setShowBill] = useState(false);

useEffect(()=>{
  dispatch(fetchUserOrders());

  const interval = setInterval(() => {
    dispatch(fetchUserOrders());
  }, 5000);

  return ()=>clearInterval(interval);
},[dispatch]);

// Use an effect to track changes when redOrders updates from fetch interval
useEffect(() => {
  if (redOrders && redOrders.length > 0) {
    checkStatusChanges(redPrevOrders, redOrders);
    dispatch(updatePreviousOrders(redOrders));
  }
}, [redOrders, redPrevOrders, dispatch]);

const checkStatusChanges = (oldOrders,newOrders)=>{

newOrders.forEach(newOrder=>{

const oldOrder = oldOrders.find(o=>o._id === newOrder._id);

if(oldOrder && oldOrder.orderStatus !== newOrder.orderStatus){

toast.info(`📦 Order ${newOrder._id.slice(-5)} is now ${newOrder.orderStatus}`,{
autoClose:5000
});

}

});

};

const cancel = async(id)=>{

try{
  const resultAction = await dispatch(cancelUserOrder(id));

  if (cancelUserOrder.fulfilled.match(resultAction)) {
    toast.success("❌ Order Cancelled");
  } else {
    toast.error(resultAction.payload || "Cancel failed");
  }
}catch(err){
  toast.error("Cancel failed");
}

};

const handleViewBill = (order) => {
  setSelectedOrder(order);
  setShowBill(true);
};

const getStatusClass = (status) => {

switch(status){

case "Pending":
return "status pending";

case "Accepted":
return "status accepted";

case "Preparing":
return "status preparing";

case "Delivered":
return "status delivered";

case "Rejected":
return "status rejected";

case "Cancelled":
return "status cancelled";

default:
return "status";

}

};

return(

<div className="container mt-5">

<h2 className="text-center mb-5">
My Orders 📦
</h2>

{status === "loading" && redOrders.length === 0 && (
<h4 className="text-center text-muted">Loading orders...</h4>
)}

{redOrders.length === 0 && status !== "loading" && (
<h4 className="text-center text-muted">
No orders yet
</h4>
)}

<div className="row">

{redOrders.map(order => (

<div key={order._id} className="col-md-6 mb-4">

<div className="order-card">

<div className="order-header">

<h6>
Order #{order._id.slice(-6)}
</h6>

<span className={getStatusClass(order.orderStatus)}>
{order.orderStatus}
</span>

</div>

<div className="order-body">

<p className="order-date text-muted mb-2">
  <small>📅 {new Date(order.createdAt).toLocaleString()}</small>
</p>

<p>
<strong>Total:</strong> ₹ {order.totalAmount}
</p>

<p>
<strong>Delivery:</strong> {order.deliveryMode}
</p>

</div>

<div className="d-flex gap-2 mt-3">
  <button
    className="btn btn-outline-primary btn-sm rounded-pill px-4"
    onClick={() => handleViewBill(order)}
  >
    View Bill
  </button>

  {order.orderStatus === "Pending" && (
    <button
      className="btn btn-danger btn-sm rounded-pill px-4"
      onClick={() => cancel(order._id)}
    >
      Cancel Order
    </button>
  )}
</div>

</div>

</div>

))}

</div>

{/* View Bill Modal */}
{showBill && selectedOrder && (
  <div className="modal-overlay" onClick={() => setShowBill(false)}>
    <div className="modal-content-custom" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header-custom">
        <h4 className="mb-0">Order Bill</h4>
        <button className="close-btn-custom" onClick={() => setShowBill(false)}>&times;</button>
      </div>
      <div className="modal-body-custom">
        <p className="mb-1 text-muted">Order ID: #{selectedOrder._id}</p>
        <p className="mb-3 text-muted">Date: {new Date(selectedOrder.createdAt).toLocaleString()}</p>
        
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
                <td>{item.name} <br/> <small className="text-muted">₹ {item.price}</small></td>
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
        <button className="btn btn-danger w-100 py-2 fw-bold" onClick={() => setShowBill(false)}>Close</button>
      </div>
    </div>
  </div>
)}

</div>

)

}

export default Orders;