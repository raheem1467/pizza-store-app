import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeCartItem, checkoutCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

function Cart() {

const dispatch = useDispatch();
const { cart, status } = useSelector((state) => state.cart);
const [paymentMode,setPaymentMode] = useState("COD");

useEffect(()=>{
  if(status === "idle"){
    dispatch(fetchCart());
  }
},[status, dispatch]);

const deleteItem = (id)=>{
  dispatch(removeCartItem(id));
};

const orderNow = async()=>{

  const resultAction = await dispatch(checkoutCart({
    deliveryMode:"Delivery",
    paymentMode
  }));

  if (checkoutCart.fulfilled.match(resultAction)) {
    toast.success("Order placed successfully 📦");
  } else {
    toast.error(resultAction.payload || "Order failed to place");
  }

};

if(status === "loading"){
  return <h3 className="text-center mt-5">Loading cart...</h3>;
}

if(!cart || !cart.items || cart.items.length === 0){
return (
<h3 className="text-center mt-5">
Your cart is empty 🛒
</h3>
);
}

return(

<div className="container mt-5">

<h2 className="text-center mb-5">
Your Cart 🛒
</h2>

<div className="row">

{/* CART ITEMS */}

<div className="col-lg-8">

{cart.items.map((item)=>(

<div key={item.itemId} className="cart-item-card">

<div className="cart-item-info">

<h5>{item.name}</h5>

<p className="text-muted">
₹ {item.price} × {item.quantity}
</p>

</div>

<div className="cart-item-actions">

<h6 className="cart-price">
₹ {item.price * item.quantity}
</h6>

<button
className="remove-btn"
onClick={()=>deleteItem(item.itemId)}
>
Remove
</button>

</div>

</div>

))}

</div>


{/* ORDER SUMMARY */}

<div className="col-lg-4">

<div className="order-summary">

<h4 className="mb-3">
Order Summary
</h4>

<p>
Items : {cart.items.length}
</p>

<p>
Total Amount
</p>

<h3 className="total-price">
₹ {cart.totalAmount}
</h3>

<select
className="payment-select"
onChange={(e)=>setPaymentMode(e.target.value)}
>

<option value="COD">Cash On Delivery</option>

<option value="UPI">UPI</option>

<option value="CARD">Card</option>

</select>

<button
className="place-order-btn"
onClick={orderNow}
>

Place Order

</button>

</div>

</div>

</div>

</div>

)

}

export default Cart;