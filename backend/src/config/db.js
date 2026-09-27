import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected ot DB");
  } catch (error) {
    console.error("unable connect due to", error);
    throw error;
  }
};
