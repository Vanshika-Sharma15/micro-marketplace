import { useEffect, useState } from "react";
import axios from "axios";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

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

      console.log("Favorites API response:", res.data); // debug

      setFavorites(res.data);

    } catch (err) {
      console.log("Favorites error:", err.response?.data);
      alert("Error loading favorites");
    }
  };

  return (
    <div style={{ padding: 20 }}>

      <h2>My Favorites ❤️</h2>

      {favorites.length === 0 && <p>No favorites yet</p>}

      {favorites.map((p) => (
        <div key={p._id}>
          <h4>{p.title}</h4>
          <p>Price: {p.price}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
