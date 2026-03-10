import Order from "../models/Order.js";
import Product from "../models/Product.js";



/* USER → PLACE ORDER */

export const placeOrder = async (req,res)=>{

  const product = await Product.findById(req.body.productId);

  if(!product){
    return res.status(404).json({message:"Product not found"});
  }

  const order = await Order.create({

    userId: req.user.id,
    productId: product._id,

    productName: product.name,
    productImage: product.image,
    productPrice: product.price,
    productCategory: product.category,

    quantity: req.body.quantity

  });

  req.io.emit("orderUpdate");

  res.json(order);
};



/* USER → VIEW THEIR ORDERS */

export const myOrders = async (req,res)=>{

  const orders = await Order.find({
    userId:req.user.id
  });

  res.json(orders);

};



/* USER → CANCEL ORDER */

export const cancelOrder = async (req,res)=>{

  const order = await Order.findById(req.params.id);

  if(!order){
    return res.status(404).json({message:"Order not found"});
  }

  if(order.userId.toString() !== req.user.id){
    return res.status(403).json({message:"Unauthorized"});
  }

  if(order.status === "Delivered"){
    return res.status(400).json({
      message:"Delivered orders cannot be cancelled"
    });
  }

  order.status = "Cancelled";

  await order.save();

  req.io.emit("orderUpdate");

  res.json(order);
};



/* USER → RETURN ORDER (7 DAYS) */

export const returnOrder = async (req,res)=>{

  const order = await Order.findById(req.params.id);

  if(!order){
    return res.status(404).json({message:"Order not found"});
  }

  /* ensure only owner returns */

  if(order.userId.toString() !== req.user.id){
    return res.status(403).json({message:"Unauthorized"});
  }

  if(order.status !== "Delivered"){
    return res.status(400).json({
      message:"Return allowed only after delivery"
    });
  }

  const deliveredDate = new Date(order.updatedAt);

  const diffDays =
    (Date.now() - deliveredDate) /
    (1000 * 60 * 60 * 24);

  if(diffDays > 7){
    return res.status(400).json({
      message:"Return period expired (7 days)"
    });
  }

  order.status = "Returned";

  await order.save();

  req.io.emit("orderUpdate");

  res.json(order);

};



/* ADMIN → VIEW ALL ORDERS */

export const allOrders = async (req,res)=>{

  const orders = await Order.find()
    .populate("userId");

  res.json(orders);

};



/* ADMIN → UPDATE ORDER STATUS */

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  const statusFlow = [
    "Placed",
    "Confirmed",
    "In_Transit",
    "Out_For_Delivery",
    "Delivered"
  ];

  const newStatus = req.body.status;

  if (!statusFlow.includes(newStatus)) {
    return res.status(400).json({
      message: "Invalid status update"
    });
  }

  const currentIndex = statusFlow.indexOf(order.status);
  const newIndex = statusFlow.indexOf(newStatus);

  // Prevent going backward
  if (newIndex <= currentIndex) {
    return res.status(400).json({
      message: "Cannot move order status backward"
    });
  }

  order.status = newStatus;

  await order.save();

  req.io.emit("orderUpdate", order);

  res.json(order);
};



/* ADMIN → ORDER CHART */
export const orderStats = async (req,res)=>{

 const totalOrders = await Order.countDocuments()

 const placed = await Order.countDocuments({status:"Placed"})
 const confirmed = await Order.countDocuments({status:"Confirmed"})
 const in_transit = await Order.countDocuments({status:"In_Transit"})
 const out_for_delivery = await Order.countDocuments({status:"Out_For_Delivery"})
 const delivered = await Order.countDocuments({status:"Delivered"})
 const cancelled = await Order.countDocuments({status:"Cancelled"})
 const returned = await Order.countDocuments({status:"Returned"})

 res.json({
   totalOrders,
   placed,
   confirmed,
   in_transit,
   out_for_delivery,
   delivered,
   cancelled,
   returned
 })

}

export const productStats = async (req,res)=>{

const stats = await Order.aggregate([

{
$match:{
status:"Delivered"
}
},

{
$group:{
_id:"$productName",
totalOrders:{ $sum:1 }
}
}

])

res.json(stats)

}


export const revenueStats = async (req,res)=>{

const revenue = await Order.aggregate([

{
$match:{
status:"Delivered"
}
},

{
$group:{
_id:null,
totalRevenue:{
$sum:{
$multiply:["$productPrice","$quantity"]
}
}
}
}

])

res.json({
totalRevenue: revenue[0]?.totalRevenue || 0
})

}

export const monthlyRevenue = async (req,res)=>{

const revenue = await Order.aggregate([

{
$match:{ status:"Delivered" }
},

{
$group:{
_id:{ $month:"$createdAt" },

revenue:{
$sum:{
$multiply:["$productPrice","$quantity"]
}
}

}
},

{
$sort:{ _id:1 }
}

])

res.json(revenue)

}


export const ordersToday = async (req,res)=>{

try{

const start = new Date()
start.setHours(0,0,0,0)

const end = new Date()
end.setHours(23,59,59,999)

const orders = await Order.find({
createdAt:{
$gte:start,
$lte:end
}
})

const stats = {
Placed:0,
Confirmed:0,
In_Transit:0,
Out_For_Delivery:0,
Delivered:0,
Cancelled:0,
Returned:0
}

orders.forEach(order=>{

if(stats.hasOwnProperty(order.status)){
stats[order.status]++
}

})

res.json({
total:orders.length,
stats
})

}catch(err){

console.log(err)
res.status(500).json({message:"Server Error"})

}

}




