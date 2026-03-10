import express from "express";
import {
  placeOrder,
  myOrders,
  cancelOrder,
  returnOrder,
  allOrders,
  updateOrderStatus,
  orderStats,
  productStats,
  revenueStats,
  monthlyRevenue,
  ordersToday,
} from "../controller/orderController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";
import apiKeyAuth from "../middleware/apikeyAuth.js";

const router = express.Router();



/* USER ROUTES */

router.post("/place", apiKeyAuth, verifyToken, placeOrder);

router.get("/my-orders", apiKeyAuth, verifyToken, myOrders);

router.put("/cancel/:id", apiKeyAuth, verifyToken, cancelOrder);

router.put("/return/:id", apiKeyAuth, verifyToken, returnOrder);



/* ADMIN ROUTES */

router.get("/admin/orders", apiKeyAuth, verifyToken, verifyAdmin, allOrders);

router.put("/admin/update/:id", apiKeyAuth, verifyToken, verifyAdmin, updateOrderStatus);

router.get("/admin/stats", apiKeyAuth, verifyToken, verifyAdmin, orderStats)

router.get("/admin/product-stats", apiKeyAuth, verifyToken, verifyAdmin, productStats)

router.get("/admin/revenue", apiKeyAuth, verifyToken, verifyAdmin, revenueStats)

router.get("/admin/monthly-revenue", apiKeyAuth, verifyToken, verifyAdmin, monthlyRevenue)

router.get("/admin/orders-today", apiKeyAuth, verifyToken, verifyAdmin, ordersToday)



export default router;