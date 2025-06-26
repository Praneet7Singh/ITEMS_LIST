import mongoose from "mongoose";

const item_schema = mongoose.Schema({
  type: mongoose.Schema.Types.String,
  item: mongoose.Schema.Types.String,
  price: mongoose.Schema.Types.Number,
  quantity: mongoose.Schema.Types.Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const Item = mongoose.model("Item", item_schema);
