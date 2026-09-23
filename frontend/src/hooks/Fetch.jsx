import { useEffect, useState } from "react";

const PRODUCTS_URL = `${import.meta.env.VITE_API_URL}/product/getallproducts`;

const useFetch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      try {
        const response = await fetch(PRODUCTS_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load the collection right now.");
        }

        const productData = await response.json();
        setProducts(productData.data.products);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(requestError.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => controller.abort();
  }, []);

  return { products, loading, error };
};

export default useFetch;
