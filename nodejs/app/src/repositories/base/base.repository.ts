import { Repository, DeepPartial } from "typeorm"
import { IBaseRepository } from "./base.repository.interface"
import { BaseEntity } from "../../entities/base.entity"

export abstract class BaseRepository<T extends BaseEntity> implements IBaseRepository<T> {
    constructor(private readonly repository: Repository<T>) {}

    async create(data: DeepPartial<T>): Promise<T> {
        const entity = this.repository.create(data)
        return await this.repository.save(entity)
    }

    async findOne(id: string): Promise<T | null> {
        return await this.repository.findOne({ where: { id } as any })
    }

    async findAll(): Promise<T[]> {
        return await this.repository.find()
    }

    async update(id: string, data: DeepPartial<T>): Promise<T | null> {
        await this.repository.update(id, data as any)
        return this.findOne(id)
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id)
    }

    async softDelete(id: string): Promise<void> {
        await this.repository.softDelete(id)
    }
}
