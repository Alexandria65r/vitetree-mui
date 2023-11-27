import mongoose from "mongoose";
let readyState = 0;

export default async function connection() {
  //mongoose.connection.close();
  if (readyState === 0) {
    console.log(process.env.MONGO_URI);
    try {
      const db = await mongoose.connect(process.env.MONGO_URI);
      readyState = db.readyState;
      if (process.env.NODE_ENV === "development") {
        console.log("connected to mongo db");
      }
      
    } catch (error) {
      console.log('.........................error.........................')
      console.log(error)
    }
  }
}
