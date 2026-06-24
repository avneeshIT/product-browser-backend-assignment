require('dotenv').config();

const app=require("./src/app")

const connectDB = require("./src/config/db")
connectDB()

app.listen(8000,()=>{
       console.log("server is running at 8000")
})