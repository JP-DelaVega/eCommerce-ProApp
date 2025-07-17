import mongoose from "mongoose";

const connectDB = async () => {
  
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://plought:z5rZ6CY-MuFckz7@cluster0.1zdkb8t.mongodb.net/proshop?retryWrites=true&w=majority&appName=Cluster0");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
