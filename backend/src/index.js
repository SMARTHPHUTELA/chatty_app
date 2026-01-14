import express from "express";
import authRoutes from "./routes/auth.route.js"

const app=express();

app.use("/api/auth",authRoutes)

app.listen(5100, ()=>{
    console.log("Server running on PORT 5100");
})