import mongoose from "mongoose";

const user = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true
  }
});

export default mongoose.model("User", user);
