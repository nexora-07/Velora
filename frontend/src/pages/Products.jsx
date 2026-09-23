import { Heart, ShoppingBag, Star } from "lucide-react";
import useFetch from "../hooks/Fetch";
import "./Products.css";

const Products = () => {
  const { products, loading, error } = useFetch();

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(price);

  return (
    <main className="products-page">
      <section className="products-hero">
        <p className="products-eyebrow">The Velora collection</p>
        <h1>Find your next signature look.</h1>
        <p>
          Thoughtfully selected essentials and everyday pieces, made to bring a
          little more character to your routine.
        </p>
      </section>

      <section className="products-catalog" aria-labelledby="catalog-title">
        <div className="catalog-toolbar">
          <div>
            <p className="catalog-eyebrow">Curated for you</p>
            <h2 id="catalog-title">Shop the collection</h2>
          </div>
          {!loading && !error && <span>{products.length} pieces</span>}
        </div>

        {loading && (
          <p className="products-status">Loading the collection...</p>
        )}

        {error && (
          <div className="products-status products-error">
            <p>{error}</p>
            <button type="button" onClick={() => window.location.reload()}>
              Try again
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="catalog-grid">
            {products.map((product) => (
              <article className="catalog-card" key={product._id}>
                <div className="catalog-image-wrap">
                  <img src={product.product_image} alt={product.title} />
                  <button
                    className="catalog-icon-button"
                    type="button"
                    aria-label={`Add ${product.title} to wishlist`}
                  >
                    <Heart size={17} strokeWidth={1.7} />
                  </button>
                </div>

                <div className="catalog-card-content">
                  <p className="catalog-category">Velora collection</p>
                  <h3>{product.title}</h3>
                  <div className="catalog-meta">
                    <span className="catalog-rating">
                      <Star size={13} fill="currentColor" strokeWidth={0} />
                      New
                    </span>
                    <span>Just published</span>
                  </div>
                  <div className="catalog-purchase-row">
                    <strong>{formatPrice(product.price)}</strong>
                    <button className="catalog-cart-button" type="button">
                      <ShoppingBag size={14} strokeWidth={1.8} />
                      Add to bag
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Products;
