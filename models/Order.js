import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
{
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  productId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product"
  },

  productName:String,
  productImage:String,
  productPrice:Number,
  productCategory:String,

  quantity:Number,

  status:{
    type:String,
    enum:[
      "Placed",
      "Confirmed",
      "In_Transit",
      "Out_For_Delivery",
      "Delivered",
      "Cancelled",
      "Returned"
    ],
    default:"Placed"
  }
},
{timestamps:true}
);

export default mongoose.model("Order",orderSchema);