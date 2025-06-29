import { Entity, Column } from "typeorm"
import { BaseEntity } from "./base.entity"

@Entity()
export class Product extends BaseEntity {
    @Column()
    name!: string

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price!: number

    @Column()
    description!: string

    @Column({ nullable: true })
    imageUrl!: string
}
