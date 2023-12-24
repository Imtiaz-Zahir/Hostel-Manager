import { Schema, model, models } from "mongoose";

const StudentSchema = new Schema(
  {
    uid: {
      type: String,
      required: [true, "UID is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    roll: {
      type: String,
      required: [true, "Roll is required"],
    },
    registration: {
      type: String,
      required: [true, "Roll is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    father: {
      type: String,
      required: [true, "Father name is required"],
    },
    fatherphone: {
      type: String,
      required: [true, "Father phone number is required"],
    },
    mother: {
      type: String,
      required: [true, "Mother name is required"],
    },
    dist: {
      type: String,
      required: [true, "District is required"],
    },
    upzila: {
      type: String,
      required: [true, "Upazila is required"],
    },
    session: {
      type: String,
      required: [true, "Session is required"],
    },
    room_no: {
      type: String,
      default: "0",
    },
    student_id: {
      type: String,
      default: "0",
    },
    is_admin: {
      type: String,
      default: "0",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    is_verified: {
      type: String,
      default: "0",
    },
  },
  { timestamps: true }
);

const Student = models.Student || model("Student", StudentSchema);

export default Student;
