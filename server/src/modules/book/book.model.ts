import mongoose, { Schema } from "mongoose";
import { IBook } from "./book.interface";

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String },
  location: { type: String, required: true },
  contactInfo: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  isAvailable: { type: Boolean, default: true },
});

export default mongoose.model<IBook>("Book", BookSchema);
