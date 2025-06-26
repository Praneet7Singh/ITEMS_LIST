import mongoose from "mongoose";

const user_schema = mongoose.Schema({
  name: mongoose.Schema.Types.String,
  email: mongoose.Schema.Types.String,
  password: mongoose.Schema.Types.String,
});

export const User = mongoose.model("User", user_schema);
