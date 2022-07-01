import { Reducer } from 'react';
import {
    CartActions  
} from '../actions';
import { CartInitialStateType } from '../context/cart_context';
import { CartItemType, ItemCartAddType, ToggleAmountItemCartType } from '../model/cart';

const {
    ADD_TO_CART,
    TOGGLE_CART_ITEM_AMOUNT,
    REMOVE_CART_ITEM,
    CLEAR_CART,
    COUNT_CART_TOTALS,
} = CartActions;

interface TotalCartType {
    total_items: number, 
    total_amount: number,
}

type CartActionsType = |{
    type: typeof CLEAR_CART | typeof COUNT_CART_TOTALS,
}|{
    type: typeof ADD_TO_CART,
    payload: ItemCartAddType,
}|{
    type: typeof TOGGLE_CART_ITEM_AMOUNT,
    payload: ToggleAmountItemCartType,
}|{
    type: typeof REMOVE_CART_ITEM,
    payload: string,
};

const cart_reducer: Reducer<CartInitialStateType, CartActionsType> = (state, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const {id, color, amount, product} = action.payload;
            const tempItem = state.cart.find(i => i.id === id + color);
            if(tempItem) {
                const tempCart = state.cart.map((cartItem) => {
                    if(cartItem.id === id + color) {
                        let newAmount = cartItem.amount + amount
                        if(cartItem.max&&newAmount > cartItem.max) {
                            newAmount = cartItem.max;
                        }
                        return {...cartItem, amount: newAmount}
                    }else {
                        return cartItem;
                    }
                })
    
                return {...state, cart: tempCart};
            }else {
                const newItem = {
                    id: id + color,
                    name: product.name,
                    color,
                    amount,
                    image: product.images[0].url,
                    price: product.price,
                    max: product.stock,
                }
                return {...state, cart: [...state.cart, newItem]}
            }
        }
    
        case REMOVE_CART_ITEM: {
            const tempCart = state.cart.filter((cartItem) => cartItem.id !== action.payload);
            return {...state, cart: tempCart}
        }
    
        case TOGGLE_CART_ITEM_AMOUNT: {
            const {id, value} = action.payload;
            const tempCart = state.cart.map(cartItem => {
                if(cartItem.id === id) {
                    if(value === 'inc'){
                        let newAmount = cartItem.amount + 1;
                        if(cartItem.max&&newAmount > cartItem.max) {
                            newAmount = cartItem.max;
                        }
                        return {...cartItem, amount: newAmount};
                    }
                    if(value === 'dec') {
                        let newAmount = cartItem.amount - 1;
                        if(newAmount < 1) {
                            newAmount = 1;
                        }
                        return {...cartItem, amount: newAmount};
                    }
                }
    
                return cartItem;
            })
            return {...state, cart: tempCart};
        }
    
        case CLEAR_CART: {
            return {...state, cart: []};
        }
    
        case COUNT_CART_TOTALS: {
            const { total_items, total_amount} = state.cart.reduce((total:TotalCartType, cartItem:CartItemType) => {
                const { amount, price } = cartItem;
                total.total_items += amount;
                total.total_amount += amount * price;
                return total;
            }, {
                total_items: 0, 
                total_amount: 0,
            })
            return {...state, total_items, total_amount}
        }

        default:
            throw new Error(`No Matching action type`);

    }
}

export default cart_reducer;
