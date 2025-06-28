import { IsString, IsNumber, IsUUID, IsOptional, Min, MaxLength } from "class-validator";

export class CreateProductDTO {
    @IsString()
    @MaxLength(100)
    name!: string;

    @IsNumber()
    @Min(0)
    price!: number;

    @IsString()
    @MaxLength(1000)
    @IsOptional()
    description!: string;
}

export class UpdateProductDTO {
    @IsString()
    @MaxLength(100)
    @IsOptional()
    name?: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    price?: number;

    @IsString()
    @MaxLength(1000)
    @IsOptional()
    description?: string;
}

export interface ProductResponseDTO {
    id: string;
    name: string;
    price: number;
    description: string;
}