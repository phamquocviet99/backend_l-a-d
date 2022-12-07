import CategoryProductModel from "../models/category_product.js";
//Function GetOne
export const get = async (req, res) => {
  try {
    const categories = await CategoryProductModel.find();
    if (categories.length >= 0) {
      for (const category of categories) {
        if (category.idParent !== "none") {
          const parentCategory = await CategoryProductModel.findById(
            category.idParent
          );
          category.nameParent = parentCategory.name;
        } else {
          category.nameParent = "Mồ côi";
        }
      }
    }
    res.status(200).json({ error: false, data: categories });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};
function FindItem(data) {
  var r = [],
    o = {};
  data.forEach(function (a) {
    if (o[a._id] && o[a._id].children) {
      a.children = o[a._id] && o[a._id].children;
    }
    o[a._id] = a;
    if (a.idParent === "none") {
      r.push(a);
    } else {
      o[a.idParent] = o[a.idParent] || {};
      o[a.idParent].children = o[a.idParent].children || [];
      o[a.idParent].children.push(a);
    }
  });
  return r;
}
export const getfor = async (req, res) => {
  try {
    const categories = await CategoryProductModel.find();
    if (categories.length >= 0) {
      for (const category of categories) {
        if (category.idParent !== "none") {
          const parentCategory = await CategoryProductModel.findById(
            category.idParent
          );
          category.nameParent = parentCategory.name;
        } else {
          category.nameParent = "Mồ côi";
        }
      }
    }
    const data = FindItem(categories)
    res.status(200).json({ error: false, data:  FindItem(categories) });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};

//Function GetByID
export const getById = async (req, res) => {
  try {
    const category = await CategoryProductModel.findById(req.params.id);
    res.status(200).json({ error: false, data: category });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};
//Function Post New Data
export const post = async (req, res) => {
  try {
    const newCategory = req.body;
    const category = new CategoryProductModel(newCategory);
    await category.save();
    res.status(200).json({ error: false, data: category });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};
//Function Update Data
export const update = async (req, res) => {
  try {
    const updateCategory = req.body;
    const category = await CategoryProductModel.findByIdAndUpdate(
      { _id: req.params.id },
      updateCategory,
      { new: true }
    ); // data updated is new data

    res.status(200).json({ error: false, data: category });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

async function removeChild(id) {
  const categories = await CategoryProductModel.find({ idParent: id });
  if (categories <= 0) return false;
  for (const c of categories) {
    await CategoryProductModel.findByIdAndDelete({ _id: c._id }).then(
      (result) => {
        removeChild(c._id);
      }
    );
  }
}

//Function Delete Data
export const remove = async (req, res) => {
  try {
    removeChild(req.params.id);
    await CategoryProductModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ error: false });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};
