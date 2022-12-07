import CategoryProjectModel from "../models/categories_projects.js";
import ProjectModel from "../models/projects.js";
import { removeProject } from "./projects.js";
//Function GetOne
export const get = async (req, res) => {
  try {
    const categories = await CategoryProjectModel.find();
    res.status(200).json({ error: false, data: categories });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};

//Function GetByID
export const getById = async (req, res) => {
  try {
    const category = await CategoryProjectModel.findById(req.params.id);
    res.status(200).json({ error: false, data: category });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};
//Function Post New Data
export const post = async (req, res) => {
  try {
    const newCategory = req.body;
    const category = new CategoryProjectModel(newCategory);
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
    const category = await CategoryProjectModel.findByIdAndUpdate(
      { _id: req.params.id },
      updateCategory,
      { new: true }
    ); // data updated is new data

    res.status(200).json({ error: false, data: category });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

//Function Delete Data
export const remove = async (req, res) => {
  try {
    const projects = await ProjectModel.find({
      id: 0,
      idCategory: req.params.id,
    });
    if (projects.length > 0) {
      for (const project of projects) {
        removeProject(project._id);
      }
    }
    await CategoryProjectModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ error: false });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};
