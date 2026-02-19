import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/products/favorites/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFavorites(res.data);
    } catch (err) {
      console.log(err.response?.data);
      alert("Error loading favorites");
    }
  };

  // REMOVE FAVORITE
  const removeFavorite = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/products/${id}/favorite`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchFavorites(); // refresh list
    } catch (err) {
      console.log(err.response?.data);
      alert("Error removing favorite");
    }
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h2>My Wishlist ❤️</h2>

      {favorites.length === 0 && <p>No favorites yet</p>}

      {/* PRODUCTS GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 250px))",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {favorites.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              height: "350px",
            }}
          >
            {/* IMAGE CLICKABLE */}
            <Link to={`/products/${p._id}`}>
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    cursor: "pointer",
                  }}
                />
              )}
            </Link>

            {/* CONTENT WRAPPER */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {/* TITLE + PRICE */}
              <div>
                <Link
                  to={`/products/${p._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <h3 style={{ marginBottom: "5px" }}>{p.title}</h3>
                </Link>

                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    marginTop: 0,
                  }}
                >
                  ₹ {p.price}
                </p>
              </div>

              {/* REMOVE BUTTON */}
              <button
                onClick={() => removeFavorite(p._id)}
                style={{
                  marginTop: "auto",
                  padding: "10px",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Remove ❌
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* BACK BUTTON */}
      <br />
      <button onClick={() => navigate("/products")}>
        ← Back to Products
      </button>
    </div>
  );
}
