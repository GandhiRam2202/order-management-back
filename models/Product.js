import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    category: {
      type: String,
      enum: ["Mobile", "Charger", "Smartwatch", "Airpods", "Neckband", "Headphones"],
    },
    price: Number,
    image: String,
    spec: String,
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);