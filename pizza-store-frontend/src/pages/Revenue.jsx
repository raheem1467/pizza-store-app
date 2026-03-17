import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRevenue } from "../redux/slices/adminSlice";

function Revenue(){

  const dispatch = useDispatch();
  const { revenue, status } = useSelector((state) => state.admin);

  useEffect(()=>{
    dispatch(fetchRevenue());
  },[dispatch]);

if(status === "loading" || !revenue){
return <h3 className="text-center mt-5">Loading...</h3>
}

return(

<div className="container mt-5">

<h2 className="text-center mb-5">
Revenue Dashboard 💰
</h2>

<div className="row g-4">

<div className="col-md-4">

<div className="card shadow-lg text-center p-4 border-0">

<h5 className="text-muted">
Current Month Revenue
</h5>

<h1 className="text-success">
₹ {revenue.monthlyRevenue}
</h1>

</div>

</div>


<div className="col-md-4">

<div className="card shadow-lg text-center p-4 border-0">

<h5 className="text-muted">
Total Revenue
</h5>

<h1 className="text-primary">
₹ {revenue.totalRevenue}
</h1>

</div>

</div>


<div className="col-md-4">

<div className="card shadow-lg text-center p-4 border-0">

<h5 className="text-muted">
Total Delivered Orders
</h5>

<h1>
{revenue.totalOrders}
</h1>

</div>

</div>

</div>

</div>

)

}

export default Revenue;