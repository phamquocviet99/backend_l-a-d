import NewsModel from "../models/news.js";

//Function GetOne
export const get = async (req, res) => {
  try {
    const countRows = await NewsModel.count();
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const newsList = await NewsModel.find()
      .sort({ _id: "asc" })
      .skip(page * limit)
      .limit(limit);
    res.status(200).json({
      error: false,
      pageInfo: { countRows: countRows, page: page, limit: limit },
      data: newsList,
    });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};

//Function GetByID
export const getById = async (req, res) => {
  try {
    const news = await NewsModel.findById(req.params.id);
    news.view = news.view + 1;
    const newsUpdated = await NewsModel.findByIdAndUpdate(
      { _id: req.params.id },
      news,
      { new: true }
    ); // data updated is new data

    res.status(200).json({ error: false, data: newsUpdated });
  } catch (err) {
    res.status(500).json({ error: true, er: err });
  }
};
//Function Post New Data
export const post = async (req, res) => {
  try {
    const newsCreate = req.body;
    const news = new NewsModel(newsCreate);
    news.view = 0;
    await news.save();
    res.status(200).json({ error: false, data: news });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};
//Function Update Data
export const update = async (req, res) => {
  try {
    const newsUpdate = req.body;
    const newsUpdated = await NewsModel.findByIdAndUpdate(
      { _id: req.params.id },
      newsUpdate,
      { new: true }
    ); // data updated is new data

    res.status(200).json({ error: false, data: newsUpdated });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

//Function Delete Data
export const remove = async (req, res) => {
  try {
    await NewsModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ error: false });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};
