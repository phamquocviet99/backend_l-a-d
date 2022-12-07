import MessageModel from "../models/message_customer.js";

export const get = async (req, res) => {
  try {
    const message = await MessageModel.find();
    res.status(200).json({error:false, data : message});
  } catch (err) {
    res.status(500).json(err);
  }
};

export const post = async (req, res) => {
  try {
    const message = req.body;
    const inforCompany = new MessageModel(message);
    await inforCompany.save();
    res.status(200).json({ newMessage: inforCompany, error: false });
  } catch (err) {
    res.status(500).json({ erro: true });
  }
};
export const remove = async (req, res) => {
    try {
      await MessageModel.findByIdAndDelete({ _id: req.params.id });
      res.status(200).json({ error: false });
    } catch (err) {
      res.status(500).json({ error: true });
    }
  };
  
