import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams(); // get id from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProduct(res.data);

    } catch (err) {
      console.log(err.response?.data);
      alert("Error loading product");
    }
  };

const addToFavorite = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      `http://localhost:5000/products/${id}/favorite`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Added to favorites");

  } catch (err) {
    console.log(err.response?.data);
    alert("Error adding favorite");
  }
};

const removeFromFavorite = async () => {
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

    alert("Removed from favorites");

  } catch (err) {
    console.log(err.response?.data);
    alert("Error removing favorite");
  }
};


  if (!product) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Product Detail Page</h2>
      
      {product.image && (
        <img
            src={product.image}
            alt={product.title}
            width="300"
            style={{ display: "block", marginBottom: "20px" }}
        />
       )}

      <h3>{product.title}</h3>
      <p>Price: {product.price}</p>
      <p>{product.description}</p>
      <br />

    <button onClick={addToFavorite}>
        Add to Favorite ❤️
    </button>

    <br /><br />

    <button onClick={removeFromFavorite}>
        Remove Favorite ❌
    </button>

    </div>
  );
}
