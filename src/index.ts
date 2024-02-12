import mongoose from "mongoose"
import app from "./controllers/app"
import * as dotenv from "dotenv"

// get dotenv values
dotenv.config()

// init mongo
mongoose.connect(process.env.mongoURI)

// init express
app.listen(process.env.PORT, () => {
    return console.log(`server is listening on ${process.env.PORT}`)
})