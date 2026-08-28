import { Product } from "./product.model";

export class InsertUpdateProductDTO {
    public readonly name: string;
    public readonly description: string;
    public readonly imageUrl: string;
    public readonly price: number;
    public readonly idCategory: number;
    public readonly idStatus: number;
    public readonly stock: number;

    constructor(data: Product) {
        this.name = data.name;
        this.description = data.description;
        this.imageUrl = data.imageUrl;
        this.price = data.price;
        this.idCategory = data.idCategory;
        this.idStatus = data.idStatus;
        this.stock = data.stock;
    }
}

export class FilterProductDTO {
    name?: string;
    minPrice?: number;
    maxPrice?: number;
    idCategory?: number;
    idStatus?: number;

    constructor(data: any = null) {
        // Deep Copy
        data = data ? JSON.parse(JSON.stringify(data)) : {};

        this.name = data.name;
        this.minPrice = data.minPrice;
        this.maxPrice = data.maxPrice;
        this.idCategory = data.idCategory;
        this.idStatus = data.idStatus;
    }
}
