import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import products_reducer from "../reducers/products_reducer";
import { products_url as url } from "../utils/constants";
import { SideBarActions, ProductsActions } from "../actions";
import { ProductType, SingleProductType } from "../model/product";
import { ChildrenProps } from "../model/children";


export interface InitialStateType  {
    isSidebarOpen: boolean,
    products_loading: boolean,
    products_error: boolean,
    products: ProductType[],
    featured_products: ProductType[],
    single_product_loading: boolean,
    single_product_error: boolean,  
    single_product: SingleProductType,
    
}


const initialState : InitialStateType= {
    isSidebarOpen: false,
    products_loading: false,
    products_error: false,
    products: [],
    featured_products: [],
    single_product_loading: false,
    single_product_error: false,
    single_product: {} as SingleProductType,
   
};

export interface ProductsInitialStateType {
    productStates: InitialStateType,
    openSidebar: () => void,
    closeSidebar: () => void,
    fetchProducts: (url:string) => Promise<void>,
    fetchSingleProduct: (url: string) => Promise<void>
}

export const ProductsContext = createContext<ProductsInitialStateType>({
    productStates: initialState,
    openSidebar: () => null,
    closeSidebar: () => null,
    fetchProducts: () => Promise.resolve(void 0),
    fetchSingleProduct: () => Promise.resolve(void 0)
});

export const ProductsProvider = ({ children }:ChildrenProps) => {
    const [productStates, dispatch] = useReducer(products_reducer, initialState);
    const { OPEN_SIDEBAR, CLOSE_SIDEBAR } = SideBarActions;
    const {
        GET_PRODUCTS_BEGIN,
        GET_PRODUCTS_SUCCESS,
        GET_PRODUCTS_ERROR,
        GET_SINGLE_PRODUCT_BEGIN,
        GET_SINGLE_PRODUCT_SUCCESS,
        GET_SINGLE_PRODUCT_ERROR,
    } = ProductsActions;
    const openSidebar = () => {
        dispatch({ type: OPEN_SIDEBAR });
    };
    const closeSidebar = () => {
        dispatch({ type: CLOSE_SIDEBAR });
    };

    const fetchProducts = async (url:string) => {
        dispatch({ type: GET_PRODUCTS_BEGIN });
        try {
            const response = await axios.get(url);
            const products = response.data;

            dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
        } catch (error) {
            dispatch({ type: GET_PRODUCTS_ERROR });
        }
    };

    const fetchSingleProduct = async (url: string) => {
        dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
        try {
            const response = await axios.get(url);
            const singleProduct = response.data;
            dispatch({
                type: GET_SINGLE_PRODUCT_SUCCESS,
                payload: singleProduct,
            });
        } catch (error) {
            dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
        }
    };

    useEffect(() => {
        fetchProducts(url);
    }, []);


    return (
        <ProductsContext.Provider
            value={{
                productStates,
                openSidebar,
                closeSidebar,
                fetchProducts,
                fetchSingleProduct,
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
};

export const useProductsContext = () => {
    return useContext(ProductsContext);
};

