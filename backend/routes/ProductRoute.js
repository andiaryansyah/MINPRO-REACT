import express from "express";
import {
  getProducts,
  getProductById,
  saveProduct,
  updateProduct,
  deleteProduct,
} from "../handlers/Products.js";

const productRouter = express.Router();

productRouter.get('/products', getProducts);
productRouter.get('/products/:id', getProductById);
productRouter.post('/products', saveProduct);
productRouter.patch('/products/:id', updateProduct);
productRouter.delete('/products/:id', deleteProduct);

export default productRouter;
