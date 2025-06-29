import { MigrationInterface, QueryRunner } from "typeorm";
import { Product } from "../entities/product.entity"
import { In } from "typeorm"


export class InitialProducts1751149989438 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const initialProducts: Partial<Product>[] = [
            {
                name: "Gaming Mouse",
                price: 59.99,
                description: "High-precision gaming mouse with adjustable DPI"
            },
            {
                name: "Mechanical Keyboard",
                price: 129.99,
                description: "RGB mechanical keyboard with Cherry MX switches"
            },
            {
                name: "Gaming Headset",
                price: 89.99,
                description: "Surround sound gaming headset with noise-cancelling microphone"
            },
            {
                name: "Mousepad XL",
                price: 24.99,
                description: "Extended gaming mousepad with stitched edges"
            },
            {
                name: "USB-C Hub",
                price: 45.99,
                description: "Multi-port USB-C hub with HDMI output"
            }
        ];
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into(Product)
            .values(initialProducts)
            .execute()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager
            .createQueryBuilder()
            .delete()
            .from(Product)
            .where({
                name: In([
                    "Gaming Mouse",
                    "Mechanical Keyboard",
                    "Gaming Headset",
                    "Mousepad XL",
                    "USB-C Hub"
                ])
            })
            .execute();
    }
}
