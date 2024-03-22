import { Schema, model, models } from "mongoose";

const MealSchema = new Schema(
  {
    uid: {
      type: String,
      required: [true, "UID is required"],
      unique: true,
    },
    cost:{
        type: Number,
        required: [true, "Cost is required"]
    },
  },
  { timestamps: true }
);

const Meal = models.Meal || model("Meal", MealSchema);

export default Meal;
