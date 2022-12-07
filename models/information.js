import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      website: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      facebook: {
        type: String,
     
      },
      google: {
        type: String,
    
      },
      twitter: {
        type: String,
      
      },
      youtube: {
        type: String,
      
      },
  
    },
    { timestamps: true }
  );
  
  export default  mongoose.model('information', schema);