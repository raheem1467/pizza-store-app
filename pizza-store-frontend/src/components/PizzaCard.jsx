import { addToCart } from "../services/cartService";
import { toast } from "react-toastify";

function PizzaCard({ pizza }) {

    const addItem = async () => {

        try {

            await addToCart({
                itemId: pizza._id,
                quantity: 1
            });

            toast.success("Pizza added to cart 🍕");

        } catch (error) {

            toast.error("Failed to add item");

        }

    };

    return (

        <div className="col-md-4 col-lg-3 mb-4">

            <div className="pizza-card">

                <img
                    src={pizza.image}
                    className="pizza-img"
                    alt={pizza.name}
                />

                <div className="pizza-body">

                    <h5 className="pizza-title">
                        {pizza.name}
                    </h5>

                    <p className="pizza-desc">
                        {pizza.description}
                    </p>

                    <div className="pizza-footer">

                        <h6 className="pizza-price">
                            ₹ {pizza.price}
                        </h6>

                        <button
                            className="add-cart-btn"
                            onClick={addItem}
                        >
                            Add To Cart
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default PizzaCard;