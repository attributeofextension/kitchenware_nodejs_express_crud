import "reflect-metadata"
import "./config/di/container"
import express from "express"
import { AppDataSource } from "./config/db/database"
import cors from 'cors';
import { productRouter } from './routes/product.routes'


const app = express()

if (process.env.NODE_ENV === "development") {
    app.use(cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE" ],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    }));
}

app.use(express.json())

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
