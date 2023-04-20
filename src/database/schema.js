import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  birthday: { type: String, required: false },
  password: { type: String, required: true },
  country: { type: String, required: false },
  imageAsset: { imageURL: String, public_id: String },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("user", UserSchema);

const TestSchema = new mongoose.Schema({
  _id: String,
  cartegory: String,
  authorId: String,
  sectionType: String,
  subjectOrlanguage: String,
  sections: [],
  duration: { type: String, required: false },
  description: String,
  status: String,
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
  score: String,
  reason: String,
  createdAt: { type: Date, default: Date.now },
});

export const Partcipant = mongoose.model("partcipant", partcipantSchema);

const courseSchema = new mongoose.Schema({
  _id: String,
  authorId: String,
  description: String,
  price: String,
  title: String,
  type: String,
  courseId: { type: String, required: false },
  vidAsset: {
    publicId: String,
    secureURL: String,
  },
  imageAsset: {
    publicId: String,
    secureURL: String,
  },
});

export const Course = mongoose.model("course", courseSchema);
