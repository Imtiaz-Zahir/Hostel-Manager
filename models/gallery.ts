import { Schema, model, models } from "mongoose";

const GallerySchema = new Schema(
  {
    id:{
        type: String,
        required: [true, "ID is required"],
        unique: true,
    },
    image_url:{
        type: String,
        required: [true, "Image URL is required"],
    }
  },
  { timestamps: true }
);

const Gallery = models.Gallery || model("Gallery", GallerySchema);

export default Gallery;
