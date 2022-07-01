export interface ProductType {
    id: string;
    name: string;
    price: number;
    image: string;
    featured?: boolean;
    colors: string[];
    company: string;
    description: string;
    category: string;
    shipping: boolean;
}

export interface ThumbnailsImagePropertiesType {
    url: string;
    width: number;
    height: number;
}

export interface SingleProductImageThumbnailsType {
    small: ThumbnailsImagePropertiesType;
    large: ThumbnailsImagePropertiesType;
    full: ThumbnailsImagePropertiesType;
}

export interface SingleProductImageType {
    id: string;
    width: number;
    height: number;
    url: string;
    filename: string;
    size: number;
    type: string;
    thumbnails: SingleProductImageThumbnailsType;
}

export interface SingleProductType {
    id: string;
    stock: number;
    price: number;
    shipping: boolean;
    featured?: boolean;
    colors: string[];
    category: string;
    images: SingleProductImageType[];
    reviews: number;
    stars: number;
    name: string;
    description: string;
    company: string;
}
