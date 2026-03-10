import express from "express";
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  topProducts,
} from "../controller/productController.js";
import { verifyAdmin, verifyToken } from "../middleware/authMiddleware.js";
import apiKeyAuth from "../middleware/apikeyAuth.js";

const router = express.Router();

/*
USER SIDE
Get all products
Get products by category
*/

router.get("/", apiKeyAuth, verifyToken, getProducts);


/*
ADMIN SIDE
*/

router.post("/add", apiKeyAuth, verifyToken, verifyAdmin, addProduct);

router.put("/update/:id", apiKeyAuth, verifyToken, verifyAdmin, updateProduct);

router.delete("/delete/:id", apiKeyAuth, verifyToken, verifyAdmin, deleteProduct);

router.get("/admin/top-products", apiKeyAuth, verifyToken, verifyAdmin, topProducts);


export default router;