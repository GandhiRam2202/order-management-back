import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};

export const getProducts = async (req, res) => {
  try {

    const filter = req.query.category
      ? { category: req.query.category }
      : {};

    const products = await Product.find(filter);

    res.json(products);

  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(product);
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);

  res.json({ message: "Product Deleted" });
};



export const topProducts = async (req,res)=>{

const stats = await Order.aggregate([

{
$match:{ status:"Delivered" }
},

{
$group:{
_id:"$productName",
totalSold:{ $sum:"$quantity" }
}
},

{
$sort:{ totalSold:-1 }
},

{
$limit:5
}

])

res.json(stats)

}




