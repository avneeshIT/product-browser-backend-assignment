const cors = require("cors");
const express= require("express");
 const app=express();
const productRoutes = require("./routes/product.routes");

app.use(cors());

app.use(express.json());
app.use("/", productRoutes);

 module.exports=app;