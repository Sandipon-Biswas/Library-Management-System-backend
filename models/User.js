import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  
  role: {
    type: String,
    enum: ["student", "librarian", "admin"],
    default: "student"
  }
});

export default mongoose.model("User", UserSchema);