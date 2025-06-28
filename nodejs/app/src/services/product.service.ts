import { injectable } from 'tsyringe';
import { Product } from '../entities/product.entity';
import { ProductResponseDTO } from '../interfaces/dtos/product.dto';

@injectable()
export class ProductService {
    mapEntityToDTO(product: Product): ProductResponseDTO {
        return {
            id: product.id,
            name: product.name,
            price: Number(product.price), // Convert Decimal to Number
            description: product.description
        };
    }
}