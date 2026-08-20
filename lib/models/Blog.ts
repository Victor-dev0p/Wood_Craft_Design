import mongoose, { Schema, models, model } from "mongoose";

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    excerpt: String,
    content: { type: String, required: true },
    imageUrl: String,
  },
  { timestamps: true },
);

export default models.Blog || model("Blog", BlogSchema);