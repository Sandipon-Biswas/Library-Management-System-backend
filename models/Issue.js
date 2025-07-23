import mongoose from "mongoose";

const IssueSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  issueDate: { type: Date, default: Date.now },
  returnDate: { type: Date, required: true },
  isReturned: { type: Boolean, default: false }
});

export default mongoose.model("Issue", IssueSchema);