import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminMenu, deleteAdminPizza } from "../redux/slices/adminSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function AdminMenu() {

  const dispatch = useDispatch();
  const { menu, status } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminMenu());
  }, [dispatch]);

  const deletePizza = async (id) => {
    const resultAction = await dispatch(deleteAdminPizza(id));
    if (deleteAdminPizza.fulfilled.match(resultAction)) {
      toast.success("Pizza deleted successfully");
    } else {
      toast.error(resultAction.payload || "Delete failed");
    }
  };

  return (

    <div className="container mt-4">

      <h2 className="text-center mb-4">
        Manage Menu 🍕
      </h2>

      <Link
        to="/admin/add-pizza"
        className="btn btn-success mb-3"
      >
        Add Item
      </Link>

      <table className="table table-bordered">

        <thead>

          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {status === "loading" && menu.length === 0 ? (
            <tr><td colSpan="5" className="text-center">Loading menu...</td></tr>
          ) : menu.map((pizza) => (

            <tr key={pizza._id}>

              <td>{pizza.name}</td>

              <td>
                <img
                  src={pizza.image}
                  alt={pizza.name}
                  width="60"
                />
              </td>

              <td>{pizza.price}</td>

              <td>{pizza.category}</td>

              <td>

                <Link
                  to={`/admin/edit/${pizza._id}`}
                  className="btn btn-warning me-2"
                >
                  Update
                </Link>

                <button
                  className="btn btn-danger"
                  onClick={() => deletePizza(pizza._id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default AdminMenu;