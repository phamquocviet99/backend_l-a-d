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
    area: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    nameCategory: {
      type: String,
      required: false,
    },
    idCategory: {
      type: String,
      required: true,
    },
    image: [],
    urlVideo: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("projects", schema);
