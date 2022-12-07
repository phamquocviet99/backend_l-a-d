import RecruitModel from "../models/recruits.js";

//Function Post New Data
export const post = async (req, res) => {
  try {
    const newRecruit = req.body;
    if (newRecruit) {
      const recruit = new RecruitModel(newRecruit);
      await recruit.save();
      res.status(200).json({ error: false, data: recruit });
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
    const countRows = await RecruitModel.count();
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const recruits = await RecruitModel.find()
      .sort({ _id: "asc" })
      .skip(page * limit)
      .limit(limit);
    res.status(200).json({
      error: false,
      pageInfo: { countRows: countRows, page: page, limit: limit },
      data: recruits,
    });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};

//Function GetByID
export const getById = async (req, res) => {
  try {
    const recruit = await RecruitModel.findById(req.params.id);

    res.status(200).json({ error: false, data: recruit });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};

//Function Update Data
export const update = async (req, res) => {
  try {
    const updateRecruit = req.body;
    const updatedProduct = await RecruitModel.findByIdAndUpdate(
      { _id: req.params.id },
      updateRecruit,
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
    await RecruitModel.findByIdAndRemove(req.params.id);
    res.status(200).json({ error: false });
  } catch (err) {
    res.status(500).json({ error: false });
  }
};
