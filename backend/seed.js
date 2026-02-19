const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Product = require("./models/Product");

mongoose.connect("mongodb://127.0.0.1:27017/microdb")
  .then(() => console.log("MongoDB connected for seeding"))
  .catch(err => console.log(err));

const seedData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    console.log("Old data removed");

    const hashedPassword = await bcrypt.hash("123456", 10);

    const users = await User.insertMany([
      {
        name: "Test User",
        email: "test@test.com",
        password: hashedPassword,
      },
      {
        name: "Admin User",
        email: "admin@test.com",
        password: hashedPassword,
      }
    ]);

    console.log("Users created");

    const images = [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35c1",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505",
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
      "https://images.unsplash.com/photo-1511385348-a52b4a160dc2"
    ];

    const products = [];

    for (let i = 1; i <= 10; i++) {
      products.push({
        title: `Product ${i}`,
        price: i * 1000,
        description: `This is product ${i}`,
        image: images[i - 1],
        createdBy: users[0]._id,
      });
    }

    await Product.insertMany(products);

    console.log("10 products created with images");
    console.log("Seeding completed");

    process.exit();

  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedData();
