import {IsString, IsNumber, IsUrl, IsOptional, Min, MaxLength, ValidateIf} from "class-validator";

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

    @IsString()
    @ValidateIf((o, value) => value !== '')
    @IsUrl()
    @IsOptional()
    imageUrl?: string;
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

    @IsString()
    @ValidateIf((o, value) => value !== '')
    @IsUrl()
    @IsOptional()
    imageUrl?: string;

}

export interface ProductResponseDTO {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl?: string;
}