import { useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

function AddPizza() {

    const [pizza, setPizza] = useState({
        name: "",
        description: "",
        price: "",
        category: "pizza",
        image: ""
    });

    const handleChange = (e) => {

        setPizza({
            ...pizza,
            [e.target.name]: e.target.value
        });

    };

    const submitPizza = async (e) => {

        e.preventDefault();

        await API.post("/menu", pizza);

        toast.success("Pizza added to menu 🍕");

    };

    return (

        <div className="container mt-4">

            <h2 className="text-center mb-4">
                Add Menu Item 🍕
            </h2>

            <form onSubmit={submitPizza} className="card p-4 shadow">

                <input
                    name="name"
                    placeholder="Name"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    name="description"
                    placeholder="Description"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    name="price"
                    type="number"
                    placeholder="Price"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    name="image"
                    placeholder="Image URL"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <select
                    name="category"
                    className="form-control mb-3"
                    onChange={handleChange}
                >

                    <option value="pizza">Pizza</option>
                    <option value="sides">Sides</option>
                    <option value="beverages">Beverages</option>
                    <option value="desserts">Desserts</option>
                    <option value="combo">Combo</option>
                    <option value="bestsellers">Best Sellers</option>
                    <option value="newlaunches">New Launches</option>

                </select>

                <button className="btn btn-success">
                    Add Item
                </button>

            </form>

        </div>

    );

}

export default AddPizza;