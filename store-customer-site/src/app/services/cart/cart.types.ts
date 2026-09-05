export interface CartProduct {
    id: number,
    name: string,
    imageUrl?: string,
    stock: number,
    price: number,
    quantity: number,
}

export interface Cart {
    products: CartProduct[],
    grandTotal: number,
}