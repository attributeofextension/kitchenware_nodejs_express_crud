import { DataSource } from "typeorm";
import { join } from "path";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "postgres",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "productdb",
    synchronize: true,
    logging: true,
    entities: [join(__dirname, "../../entities/**/*.ts")],
    migrations: [],
    subscribers: []
})