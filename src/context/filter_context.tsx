import {
    createContext, useContext,
    useEffect,
    useReducer
} from "react";
import {
    FilterActions,
    ProductsActions, SortActions, ViewProductAction
} from "../actions";
import { ChildrenProps } from "../model/children";
import { FilterType } from "../model/filter";
import { ProductType } from "../model/product";
import filter_reducer from "../reducers/filter_reducer";
import { useProductsContext } from "./products_context";

export interface FilterInitialStateType {
    filtered_products: ProductType[];
    all_products: ProductType[];
    grid_view: boolean;
    sort: string;
    filters: FilterType;
}

const initialState: FilterInitialStateType = {
    filtered_products: [],
    all_products: [],
    grid_view: true,
    sort: "price-lowest",
    filters: {
        text: "",
        company: "all",
        category: "all",
        color: "all",
        min_price: 0,
        max_price: 0,
        price: 0,
        shipping: false,
    } as FilterType,
};

type EventUpdateFiltersType =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>
    | React.MouseEvent<HTMLButtonElement, MouseEvent>;

type HtmlElement = HTMLInputElement | HTMLSelectElement | HTMLButtonElement;

export interface FilterStateType {
    FilterInitialState: FilterInitialStateType;
    setGridView: () => void;
    setListView: () => void;
    updateSort: (e: EventUpdateFiltersType) => void;
    updateFilters: (e: EventUpdateFiltersType) => void;
    clearFilters: () => void;
}

const FilterContext = createContext<FilterStateType>({
    FilterInitialState: initialState,
    setGridView: () => null,
    setListView: () => null,
    updateSort: () => null,
    updateFilters: () => null,
    clearFilters: () => null,
});

export const FilterProvider = ({ children }: ChildrenProps) => {
    const { productStates } = useProductsContext();
    const { products } = productStates;
    const [FilterInitialState, dispatch] = useReducer(
        filter_reducer,
        initialState
    );
        console.log('sssssss');
    const { LOAD_PRODUCTS } = ProductsActions;
    const { SET_GRID_VIEW, SET_LIST_VIEW } = ViewProductAction;
    const { SORT_PRODUCTS, UPDATE_SORT } = SortActions;
    const { FILTER_PRODUCTS, UPDATE_FILTERS, CLEAR_FILTERS } = FilterActions;

    useEffect(() => {
        dispatch({ type: LOAD_PRODUCTS, payload: products });
    }, [products]);

    useEffect(() => {
        dispatch({ type: FILTER_PRODUCTS });
        dispatch({ type: SORT_PRODUCTS });
    }, [FilterInitialState.sort, FilterInitialState.filters]);

    const setGridView = () => {
        dispatch({ type: SET_GRID_VIEW });
    };

    const setListView = () => {
        dispatch({ type: SET_LIST_VIEW });
    };

    const updateSort = (e: EventUpdateFiltersType) => {
        const value = (e.target as HtmlElement).value;
        dispatch({ type: UPDATE_SORT, payload: value });
    };

    const updateFilters = (e: EventUpdateFiltersType) => {
        let name = (e.target as HtmlElement).name;
        let value: string | number | null | undefined | boolean = (
            e.target as HtmlElement
        ).value;

        if (name === "category") {
            value = (e.target as HtmlElement).textContent;
        }
        if (name === "color") {
            value = (e.target as HtmlElement).dataset.color;
        }
        if (name === "price") {
            value = Number(value);
        }
        if (name === "shipping") {
            value = (e.target as HTMLInputElement).checked;
        }

        console.log("Value: ", value);

        dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
    };

    const clearFilters = () => {
        dispatch({ type: CLEAR_FILTERS });
    };

    return (
        <FilterContext.Provider
            value={{
                FilterInitialState,
                setGridView,
                setListView,
                updateSort,
                updateFilters,
                clearFilters,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = () => {
    return useContext(FilterContext);
};
