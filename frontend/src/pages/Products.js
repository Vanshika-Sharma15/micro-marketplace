import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch products when page or search changes
  useEffect(() => {
    fetchProducts();
  }, [page, search]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/products?search=${search}&page=${page}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);

    } catch (err) {
      console.log(err.response?.data);
      alert("Error loading products");
    }
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "auto",
        padding: "20px"
      }}
    >

      {/* HEADER BAR */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          marginBottom: "25px",
          borderBottom: "1px solid #ddd",
          paddingBottom: "10px"
        }}
      >
        <h2 style={{ marginRight: "10px" }}>Products</h2>

        {/* SEARCH */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPage(1);
          }}
          style={{ display: "flex", gap: "5px" }}
        >
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "8px", width: "250px" }}
          />
          <button type="submit">Search</button>
        </form>

        {/* PUSH RIGHT SIDE */}
        <div style={{ marginLeft: "auto" }}>
          <button
            onClick={() => navigate("/favorites")}
            style={{ marginRight: "10px" }}
          >
            ❤️ Wishlist
          </button>

          <button onClick={handleLogout}>
            Logout 🚪
          </button>
        </div>
      </div>

      {/* NO PRODUCTS */}
      {products.length === 0 && <p>No products found</p>}

      {/* PRODUCTS GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 250px))",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px"
        }}
      >
        {products.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              transition: "transform 0.2s",
              cursor: "pointer"
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            {/* IMAGE CLICKABLE */}
            <Link to={`/products/${p._id}`}>
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  width="100%"
                  style={{
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}
                />
              )}
            </Link>


            <Link
              to={`/products/${p._id}`}
              style={{ textDecoration: "none" }}
            >
              <h3>{p.title}</h3>
            </Link>

            <p style={{ fontWeight: "bold" }}>₹ {p.price}</p>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <br />

      <div style={{ textAlign: "center" }}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
