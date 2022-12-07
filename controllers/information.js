import InforCompanyModel from "../models/information.js";

export const get = async (req, res) => {
  try {
    const inforCompany = await InforCompanyModel.find();
    res.status(200).json(inforCompany);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getById = async (req, res) => {
  try {
    const inforCompany = await InforCompanyModel.findById(req.params.id);
    res.status(200).json({ inforCompany: inforCompany, error: false });
  } catch (err) {
    res.status(500).json({ err: true });
  }
};
export const post = async (req, res) => {
  try {
    const newInforCompany = req.body;
    const inforCompany = new InforCompanyModel(newInforCompany);
    await inforCompany.save();
    res.status(200).json({ newInforCompany: inforCompany, error: false });
  } catch (err) {
    res.status(500).json({ erro: true });
  }
};

export const update = async (req, res) => {
  try {
    const updateInforCompany = req.body;
    const inforCompany = await InforCompanyModel.findByIdAndUpdate(
      { _id: req.params.id },
      updateInforCompany,
      { new: true }
    ); // data updated is new data
    res.status(200).json({ updated: inforCompany, error: false });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};
