export interface Product {
    id: string;
    listId: number | null;
    name: string;
    price: number;
    quantity: number;
    measure: string;
    provider: string;
}

export interface List {
    id: number;
    name: string;
    totalAmount: number;
    items: Product[];
}
