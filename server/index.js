import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()

app.use(cors())
app.use(express.json())
import userRoutes from "./routes/login.js"

app.use('/api/auth', userRoutes);


mongoose
  .connect("mongodb+srv://boom2002boomyt:6Aw0QuNSLmtECJNR@users.vbtyjdv.mongodb.net/")
  .then(() => console.log("DB connected"))
  .catch((e) => console.log(e));


app.listen(3000)

console.log("Server on port 3000")