import { read, write } from "../utils/model.js";

const GetCategory = (req, res) => {
  let categories = read("categories");
  let subCategorie = read("subCategories");

  categories.map((categorie) => {
    categorie.subCategories = subCategorie.filter(
      (subCategories) => subCategories.category_id == categorie.category_id
    );

    categorie.subCategories.map((el) => delete el.category_id);
  });

  res.send(categories);
};

const PostCategory = (req, res) => {
  let categories = read("categories");
  let { category_name } = req.body;
  let newCategories = {
    category_id: categories.at(-1)?.category_id + 1 || 1,
    category_name,
  };

  categories.push(newCategories);
  write("categories", categories);
  res
    .status(200)
    .json({ status: 200, message: "categories added", data: newCategories });
};

const GetByIdCategory = (req, res) => {
  let categories = read("categories");
  let subCategorie = read("subCategories");

  let { id } = req.params;

  let categoriesId = categories.find((el) => el.category_id == id);

  categories.map((categorie) => {
    categorie.subCategories = subCategorie.filter(
      (subCategories) => subCategories.category_id == categorie.category_id
    );

    categorie.subCategories.map((el) => delete el.category_id);
  });

  res.send(categoriesId);
};

const PutCategory = (req, res) => {
  let categories = read("categories");
  let { id } = req.params;
  let { category_name } = req.body;

  let categorie = categories.find((el) => el.category_id == id);

  if (!categorie) {
    return res
      .status(404)
      .json({ status: 404, message: "categories not found" });
  } else {
    categorie.category_name = category_name || categorie.category_name;
    write("categories", categories);
    return res
      .status(200)
      .json({ status: 200, message: "categories updated", data: categorie });
  }
};

const DeleteCategory = (req, res) => {
  let categories = read("categories");
  let { id } = req.params;
  let categoriesIndex = categories.findIndex((el) => el.category_id == id);
  if (categoriesIndex != -1) {
    let categorie = categories.splice(categoriesIndex, 1);
    write("categories", categories);

    return res
      .status(200)
      .json({ status: 200, message: "categories deleted", data: categorie });
  } else {
    return res
      .status(404)
      .json({ status: 404, message: "categories not found" });
  }
};

export {
  GetCategory,
  PostCategory,
  GetByIdCategory,
  PutCategory,
  DeleteCategory,
};
