import { ProductType } from "../model/product";

export const formatPrice = (number:number) => {
    return new Intl.NumberFormat('en-US', 
        {
            style: 'currency',
            currency: 'USD'
        }).format(number/100);
}

export const getUniqueValues = (data:ProductType[], type: 'category' | 'company' | 'colors') => {
    let unique = data.map((item => item[type]));
    if(type === 'colors') {
        unique = unique.flat();
    }

    return ['all', ...Array.from(new Set(unique))]; // only save unique values 

}