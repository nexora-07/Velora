const products = [
  {
    id: 1,
    name: "Nude Luxe Press-On Nails",
    image: "/Images/Presson1.jpg",
    price: "₦19,999",
    rating: 4.9,
    reviews: 124,
  },

  {
    id: 2,
    name: "Classic False Nails",
    image: "/Images/Presson2.jpg",
    price: "₦12,999",
    rating: 4.8,
    reviews: 89,
  },

  {
    id: 3,
    name: "ElectricNailDrill",
    image: "/Images/ElectricNailDrill.jpg",
    price: "₦25,000",
    rating: 4.7,
    reviews: 56,
  },

  {
    id: 4,
    name: "Nail Polish",
    image: "/Images/NailPolish.jpg",
    price: "₦8,999",
    rating: 4.9,
    reviews: 71,
  },

  {
    id: 5,
    name: "Nail Tips",
    image: "/Images/Nailtips.jpg",
    price: "₦8,999",
    rating: 4.9,
    reviews: 71,
  },

  {
    id: 6,
    name: "Cuticle Remover",
    image: "/Images/Cuticleremovernipper.jpg",
    price: "₦8,999",
    rating: 4.9,
    reviews: 71,
  },

  {
    id: 7,
    name: "Nail Glue",
    image: "/Images/Nailglue.jpg",
    price: "₦8,999",
    rating: 4.9,
    reviews: 71,
  },

  {
    id: 8,
    name: "Nail Tools",
    image: "/Images/Tools.jpg",
    price: "₦8,999",
    rating: 4.9,
    reviews: 71,
  },

  {
    id: 9,
    name: "UV Lamp",
    image: "/Images/UVlamp.jpg",
    price: "₦8,999",
    rating: 4.9,
    reviews: 71,
  },

  {
    id: 10,
    name: "nailcharm",
    image: "/Images/nailcharm.jpg",
    price: "₦8,999",
    rating: 4.9,
    reviews: 71,
  },

  {
    id: 11,
    name: "Nude Luxe Press-On Nails",
    image: "/Images/Presson1.jpg",
    price: "₦19,999",
    rating: 4.9,
    reviews: 124,
  },

  {
    id: 12,
    name: "Classic False Nails",
    image: "/Images/Presson2.jpg",
    price: "₦12,999",
    rating: 4.8,
    reviews: 89,
  },

  {
    id: 13,
    name: "ElectricNailDrill",
    image: "/Images/ElectricNailDrill.jpg",
    price: "₦25,000",
    rating: 4.7,
    reviews: 56,
  },

  {
    id: 14,
    name: "Nail Polish",
    image: "/Images/NailPolish.jpg",
    price: "₦8,999",
    rating: 4.9,
    reviews: 71,
  },

  {
    id: 15,
    name: "Nail Tips",
    image: "/Images/Nailtips.jpg",
    price: "₦8,999",
    rating: 4.9,
    reviews: 71,
  },

  {
    id: 16,
    name: "Cuticle Remover",
    image: "/Images/Cuticleremovernipper.jpg",
    price: "₦8,999",
    rating: 4.9,
    reviews: 71,
  },

  {
    id: 17,
    name: "Nail Glue",
    image: "/Images/Nailglue.jpg",
    price: "₦8,999",
    rating: 4.9,
    reviews: 71,
  },

  {
    id: 18,
    name: "Nail Tools",
    image: "/Images/Tools.jpg",
    price: "₦8,999",
    rating: 4.9,
    reviews: 71,
  },

  {
    id: 19,
    name: "UV Lamp",
    image: "/Images/UVlamp.jpg",
    price: "₦8,999",
    rating: 4.9,
    reviews: 71,
  },

  {
    id: 20,
    name: "nailcharm",
    image: "/Images/nailcharm.jpg",
    price: "₦8,999",
    rating: 4.9,
    reviews: 71,
  },
];

const ProductSection = () => {
  return (
    <section className="product-section">
        
        <div className="product-content">

      <div className="section-heading">
        <h2>BEST SELLERS</h2>
        <p>Our most-loved nail essentials</p>
      </div>

      <div className="product-container">

        {products.map((product) => (
          <div className="product-card" key={product.id}>

            <div className="product-image">
              <img src={product.image} alt={product.name} />

              <button className="wishlist-btn">
                ♡
              </button>
            </div>

            <div className="product-info">

              <h3>{product.name}</h3>

              <div className="product-rating">
                <span>★★★★★</span>
                <small>({product.reviews})</small>
              </div>

              <p className="product-price">
                {product.price}
              </p>

              <button className="cart-btn">
                ADD TO CART
              </button>

            </div>

          </div>
        ))}

      </div>

      </div>

    </section>
  );
};

export default ProductSection;