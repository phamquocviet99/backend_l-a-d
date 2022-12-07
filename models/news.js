import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
    view: {
      type: Number,
      required: false,
    },
    urlImage: {
      type: String,
      required: false,
    },
    nameImage: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("news", schema);
