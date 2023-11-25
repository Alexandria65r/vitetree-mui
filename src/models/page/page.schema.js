import mongoose, { Mongoose } from "mongoose";

const PageSchema = new Mongoose.Schema({
  name: String,
  pageId: String,
  earnings: {
    balance: number,
    activity: {
      payouts: { type: Object, required: false },
      stars: { type: Object, required: false },
    },
  },
  imageAssets: {
    profile: { type: Object, required: false },
    background: { type: Object, required: false },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
//mongoose.models = {};
export const CreatorPage = mongoose.model("page", PageSchema);
