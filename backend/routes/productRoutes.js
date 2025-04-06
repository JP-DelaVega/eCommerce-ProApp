import express from "express";
import { getProducts, getProductById } from "../controllers/productController.js";

const router = express.Router();

// GET all products
router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

export default router;
