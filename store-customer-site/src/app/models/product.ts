export interface Product {
    id: number;
    name: string;
    description: string;
    imageUrl?: string;
    price: number;
    category: any;
    productStatus: any;
    stock: number;
    createdAt?: string;
    updatedAt?: string;
}