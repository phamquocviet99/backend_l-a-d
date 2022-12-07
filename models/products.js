import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    commonName: {
      type: String,
      required: false,
    },
    orderName: {
      type: String,
      required: false,
    },
    searchName: {
      type: String,
      required: false,
    },
    scienceName: {
      type: String,
      required: false,
    },
    englishName: {
      type: String,
      required: false,
    },
    surname: {
      type: String,
      required: false,
    },
    size: {
      type: String,
      required: false,
    },
    uses: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    nameCategory: {
      type: String,
      required: false,
    },
    idCategory: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    avatar: {
      url: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    image: [],
  },
  { timestamps: true }
);
schema.index({searchName: 'text'});
export default mongoose.model("products", schema);
