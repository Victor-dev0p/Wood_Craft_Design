import mongoose, { Schema, models, model } from "mongoose";

const CartItemSnapshotSchema = new Schema(
  {
    slug: String,
    name: String,
    wood: String,
    size: String,
    price: Number,
    quantity: Number,
  },
  { _id: false },
);

const InquirySchema = new Schema(
  {
    type: {
      type: String,
      enum: ["commission", "upgrade", "cart-quote"],
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    archetype: String,
    material: String,
    pieceOwned: String,
    orderReference: String,
    photoData: String,
    items: [CartItemSnapshotSchema],
    message: String,
    status: { type: String, enum: ["new", "responded"], default: "new" },
    response: String,
  },
  { timestamps: true },
);

export default models.Inquiry || model("Inquiry", InquirySchema);