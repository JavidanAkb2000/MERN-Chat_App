import mongoose from "mongoose";
const connecToMongoDb = async ()=>{
    try{
     await mongoose.connect(process.env.MONGODB_URI);
     console.log('Connected to MongoDB');
    }catch(error){
     console.log('Error while conecting to MongoDB',error.message);
    }
}

export default connecToMongoDb;