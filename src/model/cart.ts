import { SingleProductType } from "./product";

export interface CartItemType {
    id: string,
    name: string,
    color: string,
    amount: number,
    image: string,
    price: number,
    max?: number,
}

export interface ItemCartAddType {
    id: string,
    color: string,
    amount: number,
    product: SingleProductType
}

export interface ToggleAmountItemCartType {
    id: string,
    value: string
}