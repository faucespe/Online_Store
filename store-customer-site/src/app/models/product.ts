export interface Product {
    id: number;
    name: string;
    description: string;
    imageUrl?: string;
    price: number;
    idCategory: number;
    idStatus: number;
    stock: number;
    createdAt?: string;
    updatedAt?: string;
}