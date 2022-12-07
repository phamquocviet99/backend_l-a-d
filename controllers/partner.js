import PartnerModel from "../models/partner.js";

//Function GetOne
export const get = async (req, res) => {
  try {
    const partnerList = await PartnerModel.find();

    res.status(200).json({
      error: false,
      data: partnerList,
    });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};

//Function Post New Data
export const post = async (req, res) => {
  try {
    const partner = req.body;
    const news = new PartnerModel(partner);

    await news.save();
    res.status(200).json({ error: false, data: news });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};
//Function Delete Data
export const remove = async (req, res) => {
  try {
    await PartnerModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ error: false });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};
