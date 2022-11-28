import express from "express";
import {
  DeleteCategory,
  GetByIdCategory,
  GetCategory,
  PostCategory,
  PutCategory,
} from "./controllers/categories.controller.js";
import {
  DeleteProduct,
  GetByIdProduct,
  GetProduct,
  PostProduct,
  PutProduct,
} from "./controllers/products.controller.js";
import {
  DeleteSubCategory,
  GetByIdSubCategory,
  GetSubCategory,
  PostSubCategory,
  PutSubCategory,
} from "./controllers/subCategories.controller.js";

const app = express();

app.use(express.json());

app.route("/categories").get(GetCategory).post(PostCategory);

app
  .route("/categories/:id")
  .get(GetByIdCategory)
  .put(PutCategory)
  .delete(DeleteCategory);

app.route("/subCategories").get(GetSubCategory).post(PostSubCategory);

app
  .route("/subCategories/:id")
  .get(GetByIdSubCategory)
  .put(PutSubCategory)
  .delete(DeleteSubCategory);

app.route("/products").get(GetProduct).post(PostProduct);

app
  .route("/products/:id")
  .get(GetByIdProduct)
  .put(PutProduct)
  .delete(DeleteProduct);

app.listen(5000, () => console.log("server url http://localhost:5000"));
