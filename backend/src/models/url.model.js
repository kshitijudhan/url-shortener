import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema({
  originalUrl: {
    type: String,
    required: true,
  },

  shortCode: {
    type: String,
    unique: true,
    required: true,
  },
});

export const Url = mongoose.model("Url", urlSchema);
