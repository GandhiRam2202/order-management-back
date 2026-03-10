# Order Management System - Backend

# Project Live Link [Render](https://order-management-back-j1pm.onrender.com)

A scalable **Order Management Backend API** built with **Node.js, Express, MongoDB, and Socket.IO**.

This backend powers an **e-commerce style order management system** where users can browse products, place orders, and track their orders while **admins manage the order lifecycle and product inventory**.

---

# 🚀 Features

## 👤 User Features

* User Registration
* User Login (JWT Authentication)
* View Products
* Place Orders
* Cancel Orders
* Return Orders
* View Order History
* Track Order Status

---

## 🛠 Admin Features

* Create Products
* Edit Products
* Delete Products
* View All Orders
* Manage Order Status
* View Order Analytics
* View Revenue Statistics
* View Top Selling Products

---

# 📊 Order Status Flow

Orders move through the following stages:

```
Placed
Confirmed
In Transit
Out For Delivery
Delivered
```

Additional statuses:

```
Cancelled
Returned
```

---

# 📡 Real-Time Updates

The system uses **Socket.IO** to provide **real-time order updates**.

Examples:

* Admin confirms an order → User sees the update instantly
* Order moves to **Out For Delivery** → User dashboard updates automatically
* Delivered orders update in real-time

---

# 🔐 Authentication & Security

This backend includes **multiple security layers**.

### 1️⃣ API Key Authentication

All protected routes require an **API Key**.

Example header:

```
x-api-key: YOUR_API_KEY
```

---

### 2️⃣ JWT Authentication

After login, the server returns a **JWT token**.

This token must be sent in request headers.

Example:

```
Authorization: Bearer <token>
```

---

### 3️⃣ Role-Based Authorization

Admin routes are protected using **role-based access control**.

Only users with:

```
role = admin
```

can access admin APIs.

---

### 👨‍💼 Default Admin Credentials

```
Admin Password: adminadmin
```

⚠️ Change this password in production.

---

# 🏗 Tech Stack

### Backend

* **Node.js**
* **Express.js**

### Database

* **MongoDB**
* **Mongoose**

### Real-Time Communication

* **Socket.IO**

### Security

* **JWT Authentication**
* **API Key Authentication**
* **Role-Based Authorization**

### Other Tools

* **dotenv**
* **cors**
* **nodemon**

---

# 📁 Project Structure

```
backend
│
├── config
│   └── db.js
│
├── controllers
│   ├── authController.js
│   ├── orderController.js
│   └── productController.js
│
├── middleware
│   ├── apiKeyAuth.js
│   ├── verifyToken.js
│   └── verifyAdmin.js
│
├── models
│   ├── User.js
│   ├── Product.js
│   └── Order.js
│
├── routes
│   ├── authRoutes.js
│   ├── orderRoutes.js
│   └── productRoutes.js
│
├── public
│   └── api-docs.html
│
├── server.js
├── .env
└── package.json
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```
git clone https://github.com/GandhiRam2202/order-management-back.git
```

---

## 2️⃣ Navigate to Project

```
cd order-management-back
```

---

## 3️⃣ Install Dependencies

```
npm install
```

---

## 4️⃣ Create `.env` File

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
API_KEY=your_api_key
```

---

## 5️⃣ Run the Server

Development mode:

```
npm run dev
```

Production:

```
node server.js
```

Server will run at:

```
http://localhost:3000
```

---

# 📡 API Endpoints

## 🔑 Auth APIs

| Method | Endpoint                    | Description       |
| ------ | --------------------------- | ----------------- |
| POST   | `/api/auth/register`        | Register new user |
| POST   | `/api/auth/login`           | Login user        |
| POST   | `/api/auth/forgot-password` | Send OTP          |
| POST   | `/api/auth/reset-password`  | Reset password    |

---

## 🛍 Product APIs

| Method | Endpoint                   | Description            |
| ------ | -------------------------- | ---------------------- |
| GET    | `/api/products`            | Get all products       |
| POST   | `/api/products/add`        | Add product (Admin)    |
| PUT    | `/api/products/update/:id` | Update product (Admin) |
| DELETE | `/api/products/delete/:id` | Delete product (Admin) |

---

## 📦 Order APIs (User)

| Method | Endpoint                 | Description  |
| ------ | ------------------------ | ------------ |
| POST   | `/api/orders/place`      | Place order  |
| GET    | `/api/orders/my-orders`  | User orders  |
| PUT    | `/api/orders/cancel/:id` | Cancel order |
| PUT    | `/api/orders/return/:id` | Return order |

---

## 📊 Admin Order APIs

| Method | Endpoint                       | Description         |
| ------ | ------------------------------ | ------------------- |
| GET    | `/api/orders/admin/orders`     | Get all orders      |
| PUT    | `/api/orders/admin/update/:id` | Update order status |

---

## 📈 Admin Analytics APIs

| Method | Endpoint                            | Description          |
| ------ | ----------------------------------- | -------------------- |
| GET    | `/api/orders/admin/stats`           | Order statistics     |
| GET    | `/api/orders/admin/product-stats`   | Product statistics   |
| GET    | `/api/orders/admin/revenue`         | Total revenue        |
| GET    | `/api/orders/admin/monthly-revenue` | Monthly revenue      |
| GET    | `/api/orders/admin/orders-today`    | Today's orders       |
| GET    | `/api/products/admin/top-products`  | Top selling products |

---

# 📊 Order Status Types

```
Placed
Confirmed
In Transit
Out For Delivery
Delivered
Cancelled
Returned
```

---

# 🔐 Environment Variables

Create `.env` file:

```
PORT=3000
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret
API_KEY=your_api_key
```

⚠️ **Never upload `.env` file to GitHub**

---

# 📦 Future Improvements

Possible enhancements:

* Payment Integration
* Delivery Partner App
* Order Tracking Map
* Email Notifications
* Push Notifications
* Advanced Analytics Dashboard

---

# 👨‍💻 Author

Developed by **Parthi**

GitHub
https://github.com/GandhiRam2202

---

# ⭐ Support

If you like this project:

⭐ Star the repository
🍴 Fork the project
🚀 Contribute improvements
