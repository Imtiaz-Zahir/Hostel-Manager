import mongoose from "mongoose";

let isConnected = false;

export async function connectToDB() {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB is alrady connected!");
    return;
  } else {
    if (process.env.MONGODB_URI) {
      try {
        await mongoose.connect(process.env.MONGODB_URI, {
          dbName: "Hostel",
          //   useNewUrlParser: true,
          //   useUnifiedTopology: true,
        });
        isConnected = true;
        console.log("mongoDB connected!");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("MongoDB URI is not found");
    }
  }
}
