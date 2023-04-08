import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
  _id: String,
  cartegory: String,
  sectionType: String,
  subjectOrlanguage: String,
  sections: [],
  duration:{type:String, required:false},
  description: String,
});

mongoose.models = {};
export const Test = mongoose.model("test", TestSchema);

const partcipantSchema = new mongoose.Schema({
  _id: String,
  fullname: String,
  email: String,
  testId: String,
  taken: Boolean,
  test: { type: Object, required: false },
  results: { type: Object, required: false },
  reason: String,
  createdAt: { type: Date, default: Date.now },
});

export const Partcipant = mongoose.model("partcipant", partcipantSchema);
