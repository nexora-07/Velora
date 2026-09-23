import { useState } from "react";
import axios from "axios";
import { ArrowRight, ImagePlus } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Createproduct.css";

const Createproduct = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files && files[0] ? files[0] : null,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please log in before creating a product.");
      return;
    }

    const productData = new FormData();
    productData.append("title", formData.title);
    productData.append("price", formData.price);
    productData.append("description", formData.description);
    productData.append("product_image", formData.image);

    setIsSubmitting(true);

    try {
      await axios.post(`${apiUrl}/product/createproduct`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData({ title: "", price: "", description: "", image: null });
      toast.success("Product published successfully.");
      navigate("/product");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Product could not be published. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="create-product-page">
      <div className="create-product-top">
        <section className="create-product-intro">
          <p className="create-product-eyebrow">The Velora marketplace</p>
          <h1>Bring something beautiful to the collection.</h1>
          <p>
            Share a product with the Velora community. Add the details shoppers
            need to discover it, understand it, and make it theirs.
          </p>
          <div className="create-product-note">
            <span>01</span>
            <p>Clear details make a better shopping experience.</p>
          </div>
        </section>

        <section className="create-product-panel">
          <div className="create-product-heading">
            <p className="create-product-eyebrow">New listing</p>
            <h2>Create a product</h2>
            <p>Add the essentials below to publish your item.</p>
          </div>

          <form onSubmit={handleSubmit} className="create-product-form">
            <div className="create-product-field">
              <label htmlFor="title">Product title</label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="e.g. Everyday linen shirt"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="create-product-field">
              <label htmlFor="price">Price</label>
              <div className="price-input">
                <span>$</span>
                <input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="0.00"
                  min="500"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="create-product-field">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Tell shoppers what makes this piece special"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                required
              />
            </div>

            <div className="create-product-field">
              <label htmlFor="image">Product image</label>
              <label className="image-upload" htmlFor="image">
                <ImagePlus size={22} strokeWidth={1.5} />
                <span>
                  {formData.image?.name || "Choose a clear product image"}
                </span>
                <small>JPG, PNG or WEBP</small>
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="visually-hidden"
                required
              />
            </div>

            <button className="create-product-submit" type="submit">
              {isSubmitting ? "Publishing..." : "Publish product"}
              {!isSubmitting && <ArrowRight size={17} strokeWidth={1.8} />}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Createproduct;
