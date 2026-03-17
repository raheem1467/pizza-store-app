import { useState,useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";

function EditPizza(){

const { id } = useParams();

const navigate = useNavigate();

const [pizza,setPizza] = useState({
name:"",
description:"",
price:"",
category:"",
image:""
});

useEffect(()=>{
  const fetchPizza = async ()=>{
    const res = await API.get("/menu");
    const item = res.data.find(p => p._id === id);
    setPizza(item);
  };
  fetchPizza();
},[id]);

const handleChange = (e)=>{

setPizza({
...pizza,
[e.target.name]:e.target.value
});

};

const updatePizza = async (e)=>{

e.preventDefault();

await API.put(`/menu/${id}`,pizza);

toast.success("Pizza updated successfully");

navigate("/admin/menu");

};

return(

<div className="container mt-4">

<h2 className="text-center mb-4">
Update Menu Item
</h2>

<form className="card p-4 shadow" onSubmit={updatePizza}>

<input
name="name"
value={pizza.name}
onChange={handleChange}
className="form-control mb-3"
/>

<input
name="description"
value={pizza.description}
onChange={handleChange}
className="form-control mb-3"
/>

<input
name="price"
value={pizza.price}
onChange={handleChange}
className="form-control mb-3"
/>

<input
name="image"
value={pizza.image}
onChange={handleChange}
className="form-control mb-3"
/>

<select
name="category"
value={pizza.category}
onChange={handleChange}
className="form-control mb-3"
>

<option value="pizza">Pizza</option>
<option value="sides">Sides</option>
<option value="beverages">Beverages</option>
<option value="desserts">Desserts</option>
<option value="combo">Combo</option>
<option value="bestsellers">Best Sellers</option>
<option value="newlaunches">New Launches</option>

</select>

<button className="btn btn-warning">
Update Item
</button>

</form>

</div>

);

}

export default EditPizza;