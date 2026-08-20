import mongoose, { Schema, models, model } from "mongoose";

const OrderItemSchema = new Schema(
  {
    slug: String,
    name: String,
    selectedWood: String,
    selectedSize: String,
    price: Number,
    quantity: Number,
  },
  { _id: false },
);

const OrderSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    shippingAddress: String,
    items: [OrderItemSchema],
    subtotal: Number,
    status: {
      type: String,
      enum: ["pending_payment", "paid", "fulfilled", "cancelled"],
      default: "pending_payment",
    },
    paymentProvider: String,
    paymentReference: String,
  },
  { timestamps: true },
);

export default models.Order || model("Order", OrderSchema);