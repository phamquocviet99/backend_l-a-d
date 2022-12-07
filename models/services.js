import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    investor: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    nameCategory: {
      type: String,
      required: true,
    },
    idCategory: {
      type: String,
      required: true,
    },
    image: [
      {
        _id: { type: String, require: true },
        url: { type: String, require: true },
      },
    ],
    video: {
      _id: { type: String, require: true },
      url: { type: String, require: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("services", schema);
