import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
  
    },
    { timestamps: true }
  );

  export default  mongoose.model('categories_project', schema);