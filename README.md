# Micro Marketplace — Full Stack Web Application

## 📌 Project Overview

Micro Marketplace is a full-stack web application that allows users to register, login, browse products, search items, view product details, and manage favorite products.

This project demonstrates a complete MERN-style architecture with authentication, REST APIs, and a responsive frontend.

---

## 🚀 Features

### 🔐 Authentication

* User Registration
* User Login using JWT
* Secure authentication middleware
* Logout functionality

### 🛍 Product Marketplace

* View all products
* Search products
* Pagination support
* Product detail page
* Add/remove favorites
* Wishlist management

### ❤️ Favorites

* Add product to favorites
* Remove product from favorites
* View personal wishlist

### 🎨 UI

* Responsive layout
* Product grid marketplace
* Clean navigation
* Professional UI structure

---

## 🏗 Architecture

Frontend and backend are independent applications connected through REST APIs.

```
Frontend (React)
        ↓
Backend (Node.js + Express)
        ↓
MongoDB Database
```

---

## 🧰 Tech Stack

### Frontend

* React.js
* React Router
* Axios
* CSS / Inline Styling

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* CORS
* dotenv

---

## 📂 Project Structure

```
micro-marketplace
│
├── backend
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── server.js
│   └── package.json
│
└── frontend
    ├── src
    ├── public
    └── package.json
```

---

## ⚙️ Backend Setup

### 1. Navigate to backend

```
cd backend
```

### 2. Install dependencies

```
npm install
```

### 3. Create `.env`

```
MONGO_URI=mongodb://localhost:27017/marketplace
JWT_SECRET=your_secret_key
PORT=5000
```

### 4. Run server

```
node server.js
```

Server runs on:

```
http://localhost:5000
```

---

## 💻 Frontend Setup

### 1. Navigate to frontend

```
cd frontend
```

### 2. Install dependencies

```
npm install
```

### 3. Run app

```
npm start
```

App runs on:

```
http://localhost:3000
```

---

## 🔌 API Endpoints

### Auth

* `POST /auth/register`
* `POST /auth/login`

### Products

* `GET /products`
* `GET /products/:id`
* `POST /products` (protected)
* `PUT /products/:id`
* `DELETE /products/:id`

### Favorites

* `POST /products/:id/favorite`
* `DELETE /products/:id/favorite`
* `GET /products/favorites/my`

---

## 🔐 Environment Variables

Backend requires:

```
MONGO_URI=
JWT_SECRET=
PORT=
```

---

## 🎯 Learning Outcomes

* REST API development
* JWT authentication
* React routing
* State management
* Backend middleware
* MongoDB integration
* Full-stack architecture

---

