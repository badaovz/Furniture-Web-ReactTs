import { createContext, useContext, useEffect, useReducer } from "react";
import { CartActions } from "../actions";
import { CartItemType } from "../model/cart";
import { ChildrenProps } from "../model/children";
import { SingleProductType } from "../model/product";
import cart_reducer from "../reducers/cart_reducer";


const getLocalStorage = () => {
    let cart = localStorage.getItem("cart");
    if (cart) {
        return JSON.parse(cart);
    } else {
        return [];
    }
};

export interface CartInitialStateType {
    cart: CartItemType[],
    total_items: number,
    total_amount: number,
    shipping_fee: number
}

const initialState : CartInitialStateType = {
    cart: getLocalStorage(),
    total_items: 0,
    total_amount: 0,
    shipping_fee: 534,
};

interface CartStateType {
    CartInitialState: CartInitialStateType,
    addToCart: (id:string, color:string, amount: number, product: SingleProductType) => void,
    removeCartItem: (id:string) => void,
    toggleAmount: (id:string, value: string) => void,
    clearCart: () => void,
        
}

const CartContext = createContext<CartStateType>({
    CartInitialState: initialState,
    addToCart: () => null,
    removeCartItem: () => null,
    toggleAmount: () => null,
    clearCart: () => null,
});

export const CartProvider = ({ children }:ChildrenProps) => {
    const [CartInitialState, dispatch] = useReducer(cart_reducer, initialState);

    const {
        ADD_TO_CART,
        TOGGLE_CART_ITEM_AMOUNT,
        REMOVE_CART_ITEM,
        CLEAR_CART,
        COUNT_CART_TOTALS,
    } = CartActions;

    const addToCart = (id:string, color:string, amount:number, product: SingleProductType) => {
        dispatch({
            type: ADD_TO_CART,
            payload: { id, color, amount, product },
        });
    };

    const removeCartItem = (id:string) => {
        dispatch({ type: REMOVE_CART_ITEM, payload: id });
    };

    const toggleAmount = (id:string, value: string) => {
        dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
    };

    const clearCart = () => dispatch({ type: CLEAR_CART });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(CartInitialState.cart));
        dispatch({ type: COUNT_CART_TOTALS });
    }, [CartInitialState.cart]);

    return (
        <CartContext.Provider
            value={{
                CartInitialState,
                addToCart,
                removeCartItem,
                toggleAmount,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => {
    return useContext(CartContext);
};
