import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "../redux/slices/menuSlice";
import PizzaCard from "../components/PizzaCard";

function Menu() {

  const dispatch = useDispatch();
  const { items: menu, status } = useSelector((state) => state.menu);

  const [filteredMenu, setFilteredMenu] = useState([]);
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMenu());
    }
  }, [status, dispatch]);

  useEffect(() => {
    applyFilters(category, searchTerm);
  }, [menu, category, searchTerm]);

  const applyFilters = (cat, term) => {
    let filtered = menu;

    if (cat !== "all") {
      filtered = filtered.filter((item) =>
        item.category && item.category.toLowerCase().trim() === cat
      );
    }

    if (term) {
      const lowerTerm = term.toLowerCase();
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(lowerTerm) ||
        (item.description && item.description.toLowerCase().includes(lowerTerm))
      );
    }

    setFilteredMenu(filtered);
  };

  return (

    <div className="container mt-4">

      <h2 className="text-center mb-4">
        Pizza Menu 🍕
      </h2>

      {/* SEARCH & CATEGORY NAVBAR */}
      <div className="search-category-container mb-4">
        <div className="search-bar-wrapper mb-4">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search for your favorite pizza, sides, or beverages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="categories-wrapper mb-4">
          <div className="categories-container d-flex justify-content-start justify-content-lg-center">
            <button
              className={`btn category-pill ${category === "all" ? "active" : ""}`}
              onClick={() => setCategory("all")}
            >
              All
            </button>

            <button
              className={`btn category-pill ${category === "pizza" ? "active" : ""}`}
              onClick={() => setCategory("pizza")}
            >
              Pizza
            </button>

            <button
              className={`btn category-pill ${category === "bestsellers" ? "active" : ""}`}
              onClick={() => setCategory("bestsellers")}
            >
              Best Sellers
            </button>

            <button
              className={`btn category-pill ${category === "newlaunches" ? "active" : ""}`}
              onClick={() => setCategory("newlaunches")}
            >
              New Launches
            </button>

            <button
              className={`btn category-pill ${category === "combos" ? "active" : ""}`}
              onClick={() => setCategory("combos")}
            >
              Combos
            </button>

            <button
              className={`btn category-pill ${category === "sides" ? "active" : ""}`}
              onClick={() => setCategory("sides")}
            >
              Sides
            </button>

            <button
              className={`btn category-pill ${category === "beverages" ? "active" : ""}`}
              onClick={() => setCategory("beverages")}
            >
              Beverages
            </button>

            <button
              className={`btn category-pill ${category === "desserts" ? "active" : ""}`}
              onClick={() => setCategory("desserts")}
            >
              Desserts
            </button>
          </div>
        </div>
      </div>

      {/* MENU ITEMS */}

      <div className="row">

        {status === "loading" ? (
          <h5 className="text-center">Loading menu...</h5>
        ) : filteredMenu.length > 0 ? (

          filteredMenu.map((pizza) => (
            <PizzaCard key={pizza._id} pizza={pizza} />
          ))

        ) : (

          <h5 className="text-center">
            No items available
          </h5>

        )}

      </div>

    </div>

  );

}

export default Menu;