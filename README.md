# Order Management System - Backend

A scalable **Order Management Backend API** built with **Node.js, Express, MongoDB, and Socket.IO**.
This backend powers an e-commerce style system where users can place orders and admins can manage the order lifecycle.

---

## 🚀 Features

### 👤 User Features

* User Registration
* User Login (Authentication)
* View Products
* Place Orders
* Cancel Orders
* Return Orders
* View Order History

### 🛠 Admin Features

* Create Products
* Edit Products
* Delete Products
* View All Orders
* Manage Order Status

Order Status Flow:

Placed → Confirmed → In Transit → Out For Delivery → Delivered

Additional statuses:

* Cancelled
* Returned

### 📡 Real-time Updates

Using **Socket.IO** to notify delivery persons or admin dashboards instantly when order status changes.

---

## 🏗 Tech Stack

Backend:

* **Node.js**
* **Express.js**

Database:

* **MongoDB**
* **Mongoose**

Real-Time Communication:

* **Socket.IO**

Other Tools:

* **dotenv**
* **cors**
* **nodemon**

---

## 📁 Project Structure

```
backend
│
├── config
│   └── db.Config.js
│
├── controllers
│   ├── authController.js
│   ├── orderController.js
│   └── productController.js
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
├── .env
├── server.js
└── package.json
```

---

## ⚙️ Installation

### 1️⃣ Clone the Repository

```
git clone https://github.com/yourusername/order-management-backend.git
```

### 2️⃣ Go to Project Folder

```
cd order-management-backend
```

### 3️⃣ Install Dependencies

```
npm install
```

### 4️⃣ Create `.env` File

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 5️⃣ Run the Server

```
npm run dev
```

or

```
node server.js
```

Server will start on:

```
http://localhost:3000
```

---

## 📡 API Endpoints

### Auth

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/auth/register` | Register user |
| POST   | `/api/auth/login`    | Login user    |

---

### Products

| Method | Endpoint                   | Description      |
| ------ | -------------------------- | ---------------- |
| POST   | `/api/products/create`     | Create product   |
| GET    | `/api/products/list`       | Get all products |
| PUT    | `/api/products/update/:id` | Update product   |
| DELETE | `/api/products/delete/:id` | Delete product   |

---

### Orders

| Method | Endpoint                 | Description            |
| ------ | ------------------------ | ---------------------- |
| POST   | `/api/orders/create`     | Place order            |
| GET    | `/api/orders/user`       | Get user orders        |
| GET    | `/api/orders/list`       | Get all orders (Admin) |
| PUT    | `/api/orders/status/:id` | Update order status    |

---

## 📊 Order Status Types

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

## 🔐 Environment Variables

Create `.env` file with the following:

```
PORT=3000
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret
```

⚠️ **Never upload your `.env` file to GitHub**

---

## 📦 Future Improvements

* Payment Integration
* Delivery Partner App
* Order Tracking Map
* Email Notifications
* Push Notifications
* Analytics Dashboard

---

## 👨‍💻 Author

Developed by **Parthi**

GitHub:
https://github.com/GandhiRam2202

---

## ⭐ Support

If you like this project:

* ⭐ Star the repository
* 🍴 Fork the project
* 🚀 Contribute to improvements

---
