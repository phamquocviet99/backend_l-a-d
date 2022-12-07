import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      nameParent: {
        type: String,
        required: false,
      },
      idParent: {
        type: String,
        required: true,
      },
  
    },
    { timestamps: true }
  );

  export default  mongoose.model('categories_product', schema);