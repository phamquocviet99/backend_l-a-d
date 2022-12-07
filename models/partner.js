import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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

export default mongoose.model("partners", schema);
