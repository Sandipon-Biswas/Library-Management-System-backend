import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  genre: String,
  stock: { type: Number, default: 1 },
  isbn: String
});

export default mongoose.model("Book", BookSchema);