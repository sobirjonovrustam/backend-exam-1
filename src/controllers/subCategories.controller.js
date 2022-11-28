import { read, write } from "../utils/model.js";

const GetSubCategory = (req, res) => {
  let subCategories = read("subCategories");
  let product = read("products");

  subCategories.map((subCategorie) => {
    subCategorie.products = product.filter(
      (products) => products.sub_category_id == subCategorie.sub_category_id
    );

    subCategorie.products.map((el) => delete el.sub_category_id);
    delete subCategorie.category_id;
  });

  res.send(subCategories);
};

const PostSubCategory = (req, res) => {
  let subCategories = read("subCategories");
  let { category_id, sub_category_name } = req.body;
  let newSubCategories = {
    sub_category_id: subCategories.at(-1)?.sub_category_id + 1 || 1,
    category_id,
    sub_category_name,
  };

  subCategories.push(newSubCategories);
  write("subCategories", subCategories);
  res.status(200).json({
    status: 200,
    message: "subCategories added",
    data: newSubCategories,
  });
};

const GetByIdSubCategory = (req, res) => {
  let subCategories = read("subCategories");
  let product = read("products");

  let { id } = req.params;

  let subCategoriesId = subCategories.find((el) => el.sub_category_id == id);

  subCategories.map((subCategorie) => {
    subCategorie.products = product.filter(
      (products) => products.sub_category_id == subCategorie.sub_category_id
    );

    subCategorie.products.map((el) => delete el.sub_category_id);
    delete subCategorie.category_id;
  });

  res.send(subCategoriesId);
};

const PutSubCategory = (req, res) => {
  let subCategories = read("subCategories");
  let { id } = req.params;
  let { sub_category_name } = req.body;

  let subCategorie = subCategories.find((el) => el.sub_category_id == id);

  if (!subCategorie) {
    return res
      .status(404)
      .json({ status: 404, message: "subCategories not found" });
  } else {
    subCategorie.sub_category_name =
      sub_category_name || subCategorie.sub_category_name;
    write("subCategories", subCategories);
    return res.status(200).json({
      status: 200,
      message: "subCategories updated",
      data: sub_category_name,
    });
  }
};

const DeleteSubCategory = (req, res) => {
  let subCategories = read("subCategories");
  let { id } = req.params;
  let subCategoriesIndex = subCategories.findIndex(
    (el) => el.sub_category_id == id
  );
  if (subCategoriesIndex != -1) {
    let subCategorie = subCategories.splice(subCategoriesIndex, 1);
    write("subCategories", subCategories);

    return res.status(200).json({
      status: 200,
      message: "subCategories deleted",
      data: subCategorie,
    });
  } else {
    return res
      .status(404)
      .json({ status: 404, message: "subCategories not found" });
  }
};

export {
  GetSubCategory,
  PostSubCategory,
  GetByIdSubCategory,
  PutSubCategory,
  DeleteSubCategory,
};
