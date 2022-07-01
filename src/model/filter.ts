export interface FilterType {
    text:string,
    company: string,
    category: string,
    color: string,
    min_price: number,
    max_price: number,
    price: number,
    shipping: boolean,
}

export interface FilterUpdatePayload {
    name: string,
    value: string | number | null | undefined | boolean
}