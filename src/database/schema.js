import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  birthday: { type: String, required: false },
  password: { type: String, required: true },
  country: { type: String, required: false },
  imageAsset: { publicId: String, secureURL: String },
  courses: { type: Array, required: false },
  tutorInfo: { type: Object, required: false },
  inquiredList: { type: Array, required: false },
  studentInfo: { type: Object, required: false },
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

const wishlistAndCartSchema = new mongoose.Schema({
  _id: String,
  owner: String,
  title: String,
  link: String,
  price: String,
  productInfo: {
    id: String,
    authorId: String,
    name: String,
  },
  imageAsset: { type: Object, required: false },
});

export const CartItem = mongoose.model("cart-item", wishlistAndCartSchema);
export const WishListItem = mongoose.model("wish-list-item", wishlistAndCartSchema);

export const Post = mongoose.model(
  "forum-post",
  new mongoose.Schema({
    _id: String,
    authorId: String,
    type: String,
    budget: String,
    title: String,
    delivery: String,
    request: String,
    subjects: { type: Array, required: false },
    imageAssets: { type: Array, required: false },
    videoAssets: { type: Array, required: false },
    description: String,
    createdAt: { type: Date, default: Date.now },
  })
);

export const Inquiry = mongoose.model(
  "inquiry",
  new mongoose.Schema({
    _id: String,
    authorId: String,
    tutorId: String,
    tutorName:String,
    studentName:String,
    service: {
      label: String,
      price: String,
    },
    subjects: Array,
    topic: String,
    description: String,
    dueDate: String,
    createdAt: { type: Date, default: Date.now },
  })
);

export const InquiryFeedbackSchema = mongoose.model(
  "inquiry-feedback",
  new mongoose.Schema({
    _id: String,
    type: String,
    tutorId: String,
    studentId: String,
    inquiryId: String,
    service: Object,
    serviceTerms: {
      price: String,
      dueDate: String,
    },
    description: String,
    createdAt: { type: Date, default: Date.now },
  })
);

export const NotificationSchema = mongoose.model(
  "notifications",
  new mongoose.Schema({
    owner: String,
    refId: String,
    type: String,
    title: String,
    description: String,
    createdAt: { type: Date, default: Date.now },
  })
);

const UserInfo = {
  id: String,
  sercureURL: String,
  publicId: String,
  name: String,
};

export const TaskSchema = mongoose.model(
  "task",
  new mongoose.Schema({
    _id: String,
    studentInfo: UserInfo,
    tutorInfo: UserInfo,
    service: { price: String, label: String },
    dueDate: String,
    subjects: Array,
    topic: String,
    vidAsset: { type: Object, required: false },
    imageAsset: { type: Object, required: false },
    status: String,
  })
);
