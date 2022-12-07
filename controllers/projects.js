import CategoryModel from "../models/categories_projects.js";
import ProjectModel from "../models/projects.js";

//Function Post New Data
export const post = async (req, res) => {
  try {
    const newProject = req.body;
    if (newProject) {
      const project = new ProjectModel(newProject);
      await project.save();
      res.status(200).json({ error: false, data: project });
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
    const countRows = await ProjectModel.count();
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 100;
    const projects = await ProjectModel.find()
      .sort({ _id: "asc" })
      .skip(page * limit)
      .limit(limit);
    if (projects.length > 0) {
      for (const project of projects) {
        const category = await CategoryModel.findById(project.idCategory);
        project.nameCategory = category.name;
      }
    }
    res.status(200).json({
      error: false,
      pageInfo: { countRows: countRows, page: page, limit: limit },
      data: projects,
    });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};

//Function GetByID
export const getById = async (req, res) => {
  try {
    const project = await ProjectModel.findById(req.params.id);
    if (project) {
      const category = await CategoryModel.findById(project.idCategory);
      project.nameCategory = category.name;
    }
    res.status(200).json({ error: false, data: project });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};

//Function GetByIdCategory
export const getByIdCategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const countRows = await ProjectModel.find({
      id: 0,
      idCategory: req.params.id,
    }).count();
    const projects = await ProjectModel.find({
      id: 0,
      idCategory: req.params.id,
    })
      .sort({ _id: "asc" })
      .skip(page * limit)
      .limit(limit);
    if (projects.length > 0) {
      for (const project of projects) {
        const category = await CategoryModel.findById(project.idCategory);
        project.nameCategory = category.name;
      }
    }
    res.status(200).json({
      error: false,
      pageInfo: { countRows: countRows, page: page, limit: limit },
      data: projects,
    });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};

//Function Update Data
export const update = async (req, res) => {
  try {
    const updateProduct = req.body;
    updateProduct.nameCategory = "";
    const updatedProduct = await ProjectModel.findByIdAndUpdate(
      { _id: req.params.id },
      updateProduct,
      { new: true }
    ); // data updated is new data
    res.status(200).json({ error: false, data: updatedProduct });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};

//Function Delete Data
export const remove = async (req, res) => {
  try {
    await ProjectModel.findByIdAndRemove(req.params.id);
    res.status(200).json({ error: false });
  } catch (err) {
    res.status(500).json({ error: false });
  }
};

export const removeProject = async (id) => {
  try {
    await ProjectModel.findByIdAndRemove(id);
    return true;
  } catch (err) {
    return false;
  }
};
