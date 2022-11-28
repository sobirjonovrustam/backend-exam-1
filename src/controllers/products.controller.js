import { read, write } from "../utils/model.js";

const GetProduct = (req, res) => {
  let product = read("products");
  let subCategorie = read("subCategories");

  let { categoryId, subCategoryId, model } = req.query;

  let productCategory = product.filter(
    (el) => el.sub_category_id == categoryId
  );

  let productSubCategory = product.filter(
    (el) => el.sub_category_id == subCategoryId
  );

  let productSubCategoryInModel = product.filter(
    (el) => el.sub_category_id == subCategoryId && el.model == model
  );

  let productModel = product.filter((el) => el.model == model);

  if (productCategory.length) {
    return res.send(productCategory);
  }

  if (productSubCategoryInModel.length) {
    return res.send(productSubCategoryInModel);
  }

  if (productSubCategory.length) {
    return res.send(productSubCategory);
  }

  if (productModel.length) {
    return res.send(productModel);
  }

  res.end("[]");
};

const PostProduct = (req, res) => {
  let products = read("products");
  let { sub_category_id, model, product_name, color, price } = req.body;
  let newProducts = {
    product_id: products.at(-1)?.product_id + 1 || 1,
    sub_category_id,
    model,
    product_name,
    color,
    price,
  };

  products.push(newProducts);
  write("products", products);
  res
    .status(200)
    .json({ status: 200, message: "products added", data: newProducts });
};

const GetByIdProduct = (req, res) => {
  let product = read("products");

  let { id } = req.params;

  let productsId = product.find((el) => el.product_id == id);

  res.send(productsId);
};

const PutProduct = (req, res) => {
  let products = read("products");
  let { id } = req.params;
  let { product_name } = req.body;

  let product = products.find((el) => el.product_id == id);

  if (!product) {
    return res.status(404).json({ status: 404, message: "products not found" });
  } else {
    product.product_name = product_name || product.product_name;
    write("products", products);
    return res
      .status(200)
      .json({ status: 200, message: "products updated", data: product });
  }
};

const DeleteProduct = (req, res) => {
  let products = read("products");
  let { id } = req.params;
  let productsIndex = products.findIndex((el) => el.product_id == id);
  if (productsIndex != -1) {
    let product = products.splice(productsIndex, 1);
    write("products", products);

    return res
      .status(200)
      .json({ status: 200, message: "products deleted", data: product });
  } else {
    return res.status(404).json({ status: 404, message: "products not found" });
  }
};

export { GetProduct, PostProduct, GetByIdProduct, PutProduct, DeleteProduct };
