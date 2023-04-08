import mongoose from "mongoose";
let readyState = 0;

export default async function connection () {
  if (readyState === 0) {
    const db = await mongoose.connect( process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    });

    readyState = db.readyState;
    if (process.env.NODE_ENV === "development") {
      console.log("connected to mongo db");
    }
  } 
}
