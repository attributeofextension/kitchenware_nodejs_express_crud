import "reflect-metadata"
import "./config/di/container"
import express from "express"
import { AppDataSource } from "./config/db/database"
import { productRouter } from './routes/product.routes'


const app = express()

app.use('/api/products', productRouter)

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")

        app.listen(3000, () => {
            console.log("Server is running on port 3000")
        })
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })
