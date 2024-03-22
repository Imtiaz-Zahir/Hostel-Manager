import { Schema, model, models } from "mongoose";

const NoticeSchema = new Schema(
  {
    uid: {
      type: String,
      required: [true, "UID is required"],
      unique: true,
    },
    critical:{
        type: Boolean,
        required: [true, "Critical is required"]
    },
    descrip:{
        type: String,
        required: [true, "Description is required"]
    },
  },
  { timestamps: true }
);

const Notice = models.Notice || model("Notice", NoticeSchema);

export default Notice;
