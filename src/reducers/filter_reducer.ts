import { Reducer } from "react";
import { ViewProductAction, SortActions, FilterActions, ProductsActions } from "../actions";
import { FilterInitialStateType } from "../context/filter_context";
import { FilterUpdatePayload } from "../model/filter";
import { ProductType } from "../model/product";

const { LOAD_PRODUCTS } = ProductsActions;
const { SET_GRID_VIEW, SET_LIST_VIEW } = ViewProductAction;
const { SORT_PRODUCTS, UPDATE_SORT } = SortActions;
const { FILTER_PRODUCTS, UPDATE_FILTERS, CLEAR_FILTERS } = FilterActions;



type FilterActionType = |{
    type: typeof SET_GRID_VIEW| typeof SET_LIST_VIEW | typeof SORT_PRODUCTS | typeof FILTER_PRODUCTS| typeof CLEAR_FILTERS,
}|{
    type: typeof LOAD_PRODUCTS,
    payload: ProductType[]
}|{
    type: typeof UPDATE_SORT,
    payload: string
}|{
    type: typeof UPDATE_FILTERS,
    payload: FilterUpdatePayload
};

const filter_reducer : Reducer<FilterInitialStateType, FilterActionType> = (state, action) => {
    switch (action.type) {
        case LOAD_PRODUCTS:
            let maxPrice = action.payload.map((product) => product.price);
            const newMaxPrice = Math.max(...maxPrice);
            return {
                ...state,
                all_products: [...action.payload],
                filtered_products: [...action.payload],
                filters: {
                    ...state.filters,
                    max_price: newMaxPrice,
                    price: newMaxPrice,
                },
            };

        case SET_GRID_VIEW: {
            return { ...state, grid_view: true };
        }

        case SET_LIST_VIEW: {
            return { ...state, grid_view: false };
        }

        case SORT_PRODUCTS: {
            const { sort, filtered_products } = state;
            let tempProducts: ProductType[] = [];
            if (sort === "price-lowest") {
                tempProducts = filtered_products.sort((a, b) => {
                    return a.price - b.price;
                });
            }

            if (sort === "price-highest") {
                tempProducts = filtered_products.sort((a, b) => {
                    return b.price - a.price;
                });
            }

            if (sort === "name-a") {
                tempProducts = filtered_products.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
            }

            if (sort === "name-z") {
                tempProducts = filtered_products.sort((a, b) => {
                    return b.name.localeCompare(a.name);
                });
            }

            return {
                ...state,
                filtered_products: tempProducts,
            };
        }

        case UPDATE_SORT: {
            return { ...state, sort: action.payload };
        }

        case FILTER_PRODUCTS:
            const { all_products } = state;
            const { text, category, company, color, price, shipping } =
                state.filters;
            let tempProducts = [...all_products];
            if (text) {
                tempProducts = tempProducts.filter((product) =>
                    product.name.toLowerCase().startsWith(text)
                );
            }

            if (category !== "all") {
                tempProducts = tempProducts.filter(
                    (product) => product.category === category
                );
            }
            if (company !== "all") {
                tempProducts = tempProducts.filter(
                    (product) => product.company === company
                );
            }

            if (color !== "all") {
                tempProducts = tempProducts.filter((product) => {
                    console.log("Color: ", product.colors);
                    return product.colors.find((c) => c === color);
                });
            }

            tempProducts = tempProducts.filter(
                (product) => product.price <= price
            );

            if (shipping) {
                tempProducts = tempProducts.filter(
                    (product) => product.shipping === true
                );
            }

            return {
                ...state,
                filtered_products: tempProducts,
            };

        case UPDATE_FILTERS:
            const { name, value } = action.payload;
            return {
                ...state,
                filters: { ...state.filters, [name]: value },
            };
        case CLEAR_FILTERS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    text: "",
                    company: "all",
                    category: "all",
                    color: "all",
                    price: state.filters.max_price,
                    shipping: false,
                },
            };
        default:
            throw new Error(`No Matching - action type`);
    }
};

export default filter_reducer;
