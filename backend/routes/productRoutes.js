const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

// CREATE PRODUCT
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, price, description, image } = req.body;

    if (!title || !price) {
        return res.status(400).json({
            message: "Title and price are required"
        });
    }


    const product = new Product({
      title,
      price,
      description,
      image,
      createdBy: req.user.id,
    });

    await product.save();

    res.status(201).json({
      message: "Product created",
      product,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ALL PRODUCTS + SEARCH + PAGINATION
router.get("/", async (req, res) => {
  try {
    const { search = "", page = 1, limit = 5 } = req.query;

    const filter = {
      title: { $regex: search, $options: "i" }
    };

    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      products,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit)
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ================= FAVORITES ROUTES =================

// Add product to favorites
router.post("/:id/favorite", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.favorites.includes(req.params.id)) {
      user.favorites.push(req.params.id);
      await user.save();
    }

    res.json({ message: "Added to favorites" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove product from favorites
router.delete("/:id/favorite", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.favorites = user.favorites.filter(
      fav => fav.toString() !== req.params.id
    );

    await user.save();

    res.json({ message: "Removed from favorites" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get my favorites
router.get("/favorites/my", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");

    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE product
router.put("/:id", async (req, res) => {
  try {
    const { title, price, description } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { title, price, description },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated",
      product: updatedProduct
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE product
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;