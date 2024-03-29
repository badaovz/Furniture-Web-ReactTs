// export const OPEN_SIDEBAR = 'OPEN_SIDEBAR';
// export const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR'; 
// export const GET_PRODUCTS_BEGIN = 'GET_PRODUCTS_BEGIN';
// export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
// export const GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR';
// export const GET_SINGLE_PRODUCT_BEGIN = 'GET_SINGLE_PRODUCT_BEGIN';
// export const GET_SINGLE_PRODUCT_SUCCESS = 'GET_SINGLE_PRODUCT_SUCCESS';
// export const GET_SINGLE_PRODUCT_ERROR = 'GET_SINGLE_PRODUCT_ERROR';
// export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
// export const SET_GRID_VIEW = 'SET_GRID_VIEW';
// export const SET_LIST_VIEW = 'SET_LIST_VIEW';
// export const SORT_PRODUCTS = 'SORT_PRODUCTS';
// export const UPDATE_SORT = 'UPDATE_SORT';
// export const FILTER_PRODUCTS = 'FILTER_PRODUCTS';
// export const UPDATE_FILTERS = 'UPDATE_FILTERS';
// export const CLEAR_FILTERS = 'CLEAR_FILTERS';
// export const ADD_TO_CART = 'ADD_TO_CART';
// export const TOGGLE_CART_ITEM_AMOUNT = 'TOGGLE_CART_ITEM_AMOUNT';
// export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
// export const CLEAR_CART = 'CLEAR_CART';
// export const COUNT_CART_TOTALS = 'COUNT_CART_TOTALS';

export enum SideBarActions {
    OPEN_SIDEBAR = 'OPEN_SIDEBAR',
    CLOSE_SIDEBAR = 'CLOSE_SIDEBAR',

}

export enum ProductsActions {
    LOAD_PRODUCTS = 'LOAD_PRODUCTS',
    GET_PRODUCTS_BEGIN = 'GET_PRODUCTS_BEGIN',
    GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS',
    GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR',
    GET_SINGLE_PRODUCT_BEGIN = 'GET_SINGLE_PRODUCT_BEGIN',
    GET_SINGLE_PRODUCT_SUCCESS = 'GET_SINGLE_PRODUCT_SUCCESS',
    GET_SINGLE_PRODUCT_ERROR = 'GET_SINGLE_PRODUCT_ERROR',
}

export enum SingleProductActions {

}

export enum CartActions {
    ADD_TO_CART = 'ADD_TO_CART',
    TOGGLE_CART_ITEM_AMOUNT = 'TOGGLE_CART_ITEM_AMOUNT',
    REMOVE_CART_ITEM = 'REMOVE_CART_ITEM',
    CLEAR_CART = 'CLEAR_CART',
    COUNT_CART_TOTALS = 'COUNT_CART_TOTALS',

}

export enum ViewProductAction {
    SET_GRID_VIEW = 'SET_GRID_VIEW',
    SET_LIST_VIEW = 'SET_LIST_VIEW',

}

export enum SortActions {
    SORT_PRODUCTS = 'SORT_PRODUCTS',
    UPDATE_SORT = 'UPDATE_SORT',

}

export enum FilterActions {
    FILTER_PRODUCTS = 'FILTER_PRODUCTS',
    UPDATE_FILTERS = 'UPDATE_FILTERS',
    CLEAR_FILTERS = 'CLEAR_FILTERS',

}
