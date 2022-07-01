import { Reducer } from "react";
import { SideBarActions, ProductsActions } from "../actions";
import { InitialStateType } from "../context/products_context";
import { ProductType, SingleProductType } from "../model/product";

const { OPEN_SIDEBAR, CLOSE_SIDEBAR } = SideBarActions;
const {
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    GET_SINGLE_PRODUCT_BEGIN,
    GET_SINGLE_PRODUCT_SUCCESS,
    GET_SINGLE_PRODUCT_ERROR,
} = ProductsActions;

type ProductActionType =
    | typeof OPEN_SIDEBAR
    | typeof CLOSE_SIDEBAR
    | typeof GET_PRODUCTS_BEGIN
    | typeof GET_PRODUCTS_SUCCESS
    | typeof GET_PRODUCTS_ERROR
    | typeof GET_SINGLE_PRODUCT_BEGIN
    | typeof GET_SINGLE_PRODUCT_SUCCESS
    | typeof GET_SINGLE_PRODUCT_ERROR;


type ProductsActionType =
    | {
          type: typeof OPEN_SIDEBAR | typeof CLOSE_SIDEBAR | typeof GET_PRODUCTS_BEGIN
          | typeof GET_PRODUCTS_ERROR | typeof GET_SINGLE_PRODUCT_BEGIN
          | typeof GET_SINGLE_PRODUCT_ERROR,
      }
    
    |{
        type: typeof GET_PRODUCTS_SUCCESS,
        payload: ProductType[]
    }
    |{
        type: typeof GET_SINGLE_PRODUCT_SUCCESS,
        payload: SingleProductType
    };

const products_reducer: Reducer<InitialStateType, ProductsActionType> = (
    state,
    action
) => {
    switch (action.type) {
        case OPEN_SIDEBAR: {
            return { ...state, isSidebarOpen: true };
        }

        case CLOSE_SIDEBAR: {
            return { ...state, isSidebarOpen: false };
        }

        case GET_PRODUCTS_BEGIN: {
            return { ...state, products_loading: true };
        }

        case GET_PRODUCTS_SUCCESS: {
            const featured_products = action.payload?.filter(
                (product) => product.featured === true
            );

            return {
                ...state,
                products_loading: false,
                products: action.payload,
                featured_products,
            };
        }

        case GET_PRODUCTS_ERROR: {
            return { ...state, products_loading: false, products_error: true };
        }

        case GET_SINGLE_PRODUCT_BEGIN: {
            return {
                ...state,
                single_product_loading: true,
                single_product_error: false,
            };
        }

        case GET_SINGLE_PRODUCT_SUCCESS: {
            return {
                ...state,
                single_product_loading: false,
                single_product: action.payload,
            };
        }

        case GET_SINGLE_PRODUCT_ERROR: {
            return {
                ...state,
                single_product_loading: false,
                single_product_error: true,
            };
        }
        default:
            throw new Error(`No matching action type`);
    }
};

export default products_reducer;
