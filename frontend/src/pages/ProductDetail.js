import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchProduct();
    checkFavorite();
  }, []);

  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/products/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProduct(res.data);
    } catch (err) {
      alert("Error loading product");
    }
  };

  // check if product already in wishlist
  const checkFavorite = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/products/favorites/my",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const exists = res.data.some((p) => p._id === id);
      setIsFavorite(exists);

    } catch (err) {
      console.log(err);
    }
  };

  // toggle wishlist
  const toggleFavorite = async () => {
    try {
      const token = localStorage.getItem("token");

      if (isFavorite) {
        await axios.delete(
          `http://localhost:5000/products/${id}/favorite`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsFavorite(false);
      } else {
        await axios.post(
          `http://localhost:5000/products/${id}/favorite`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsFavorite(true);
      }
    } catch (err) {
      alert("Error updating wishlist");
    }
  };

  if (!product) return <h2>Loading...</h2>;

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h2>Product Detail</h2>

      {product.image && (
        <img
          src={product.image}
          alt={product.title}
          width="300"
          style={{ marginBottom: "20px" }}
        />
      )}

      <h3>{product.title}</h3>
      <p>Price: ₹ {product.price}</p>
      <p>{product.description}</p>

      {/* HEART TOGGLE */}
      <button
        onClick={toggleFavorite}
        style={{
          fontSize: "25px",
          border: "none",
          background: "none",
          cursor: "pointer",
        }}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      <br />

      <button
        onClick={() => navigate("/products")}
        style={{
          padding: "10px 15px",
          cursor: "pointer",
          marginTop: "20px"
        }}
      >
        ← Back to Products
      </button>

    </div>
  );
}
