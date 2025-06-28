import { DeepPartial } from "typeorm"

export interface IBaseRepository<T> {
    create(data: DeepPartial<T>): Promise<T>
    findOne(id: string): Promise<T | null>
    findAll(): Promise<T[]>
    update(id: string, data: DeepPartial<T>): Promise<T | null>
    delete(id: string): Promise<void>
    softDelete(id: string): Promise<void>
}