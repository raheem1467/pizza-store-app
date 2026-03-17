import { Link } from "react-router-dom";

function Home(){

return(

<div>

{/* HERO SECTION */}

<div className="hero-section text-center text-white">

<div className="hero-overlay">

<h1 className="hero-title">
Welcome to <span>Pizzeria</span> 🍕
</h1>

<p className="hero-subtitle">
Hot, Fresh & Delicious Pizzas Delivered To Your Door
</p>

<Link to="/menu" className="order-btn">
Order Now
</Link>

</div>

</div>


{/* FEATURES SECTION */}

<div className="container text-center mt-5">

<h2 className="mb-4">
Why Choose Pizzeria?
</h2>

<div className="row">

<div className="col-md-4 mb-4">

<div className="feature-card">

<h4>🍕 Fresh Ingredients</h4>

<p>
We use only the freshest ingredients to make every pizza delicious.
</p>

</div>

</div>


<div className="col-md-4 mb-4">

<div className="feature-card">

<h4>⚡ Fast Delivery</h4>

<p>
Hot pizzas delivered quickly right to your doorstep, freshly baked.
</p>

</div>

</div>


<div className="col-md-4 mb-4">

<div className="feature-card">

<h4>⭐ Best Taste</h4>

<p>
Authentic flavors that make every bite unforgettable.
</p>

</div>

</div>

</div>

</div>


{/* FOOTER */}

<footer className="footer mt-5">

<div className="container text-center">

<h5>Pizzeria 🍕</h5>

<p>
Serving happiness with every slice.
</p>

<p className="copyright">
© 2026 Pizzeria. All Rights Reserved.
</p>

</div>

</footer>

</div>

)

}

export default Home;