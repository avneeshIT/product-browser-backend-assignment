const { createProductService } = require("../services/product.service");
const { getProductService } = require("../services/product.service");


const createProduct = async (req, res) => {
    const { name, category, price } = req.body;


    const product = await createProductService({
  name,
  category,
  price
});

res.status(201).json({
  success: true,
  message: "Product created successfully",
  data: product
});

};



const getProducts=async(req,res)=>{
    const {category,cursor,limit=10}=req.query;


    const products= await getProductService(category,cursor ,limit);


    res.status(200).json({
        success:true,
        data:products

    })
};
module.exports={ createProduct,getProducts};