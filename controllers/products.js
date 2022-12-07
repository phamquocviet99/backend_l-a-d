import CategoryModel from "../models/category_product.js";
import ProductModel from "../models/products.js";

//Function Post New Data
export const post = async (req, res) => {
  try {
    const newProduct = req.body;
    if (newProduct) {
      const product = new ProductModel(newProduct);
      product.searchName = removeVietnameseTones(newProduct.commonName);
      await product.save();
      res.status(200).json({ error: false, data: product });
    } else {
      res.status(500).json({ error: true });
    }
  } catch (err) {
    res.status(500).json({ error: true });
  }
};

//Function GetAll
export const get = async (req, res) => {
  try {
    const countRows = await ProductModel.count();
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const products = await ProductModel.find()
      .sort({ _id: "asc" })
      .skip(page * limit)
      .limit(limit);
    if (products.length > 0) {
      for (const product of products) {
        const category = await CategoryModel.findById(product.idCategory);
        product.nameCategory = category.name;
      }
    }
    res.status(200).json({
      error: false,
      pageInfo: { countRows: countRows, page: page, limit: limit },
      data: products,
    });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};

//Function GetByID
export const getById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      const category = await CategoryModel.findById(product.idCategory);
      product.nameCategory = category.name;
    }
    res.status(200).json({ error: false, data: product });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};

//Function GetByIdCategory
export const getByIdCategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const countRows = await ProductModel.find({
      id: 0,
      idCategory: req.params.id,
    }).count();
    const products = await ProductModel.find({
      id: 0,
      idCategory: req.params.id,
    })
      .sort({ _id: "asc" })
      .skip(page * limit)
      .limit(limit);
    if (products.length > 0) {
      for (const product of products) {
        const category = await CategoryModel.findById(product.idCategory);
        product.nameCategory = category.name;
      }
    }
    res.status(200).json({
      error: false,
      pageInfo: { countRows: countRows, page: page, limit: limit },
      data: products,
    });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};

//Function Update Data
export const update = async (req, res) => {
  try {
    const updateProject = req.body;
    updateProject.nameCategory = "";
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      { _id: req.params.id },
      updateProject,
      { new: true }
    ); // data updated is new data
    res.status(200).json({ error: false, data: updatedProduct });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};
export const search = async (req, res) => {
  try {
    const searchString = removeVietnameseTones(req.body.key);

    const countRows = await ProductModel.count();
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const products = await ProductModel.find({
      $text: { $search: searchString },
    })
      .sort({ _id: "asc" })
      .skip(page * limit)
      .limit(limit);
    if (products.length > 0) {
      for (const product of products) {
        const category = await CategoryModel.findById(product.idCategory);
        product.nameCategory = category.name;
      }
    }
    res.status(200).json({
      error: false,
      pageInfo: { countRows: countRows, page: page, limit: limit },
      data: products,
    });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};
function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "a");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "e");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "i");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "o");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "u");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "y");
  str = str.replace(/Đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}

//Function Delete Data
export const remove = async (req, res) => {
  try {
    await ProductModel.findByIdAndRemove(req.params.id);
    res.status(200).json({ error: false });
  } catch (err) {
    res.status(500).json({ error: false });
  }
};

export const removeProject = async (id) => {
  try {
    await ProductModel.findByIdAndRemove(id);
    return true;
  } catch (err) {
    return false;
  }
};
