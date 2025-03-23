// Create a Slice
// Crate a Readucers
// export the reducer and reduces

import { Product } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

interface ProductCart extends Partial<Product> {
    id: string;
    title: string;
    salePrice: number;
    uploadedFiles: string[];
    qty: number;
}

let initialState: ProductCart[] = [];
try {
    const storedCart = localStorage.getItem("cart");
    initialState = storedCart ? JSON.parse(storedCart) : [];
} catch (error) {
    console.error("Error parsing cart data:", error);
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id, title, salePrice, uploadedFiles } = action.payload;
            // Check if the item already exits in the cart
            const existingItem = state.find((item) => item.id === id);

            if (existingItem) {
                //if the item is exists, update the quantity
                existingItem.qty += 1;
            } else {
                // if the item doesn't exists, add it to the cart
                const newItem = { id, title, salePrice, uploadedFiles, qty: 1 };
                state.push(newItem);

                localStorage.setItem("cart", JSON.stringify([...state, newItem]));
            }
        },
        removeFromCart: (state, action) => {
            const cartId = action.payload;
            const newState = state.filter((item) => item.id !== cartId);

            localStorage.setItem("cart", JSON.stringify(newState));
            return newState;
        },
        incrementQty: (state, action) => {
            const cartId = action.payload;
            const cartItem = state.find((item) => item.id === cartId);
            if (cartItem) {
                cartItem.qty += 1;
                localStorage.setItem("cart", JSON.stringify([...state]));
            }
        },
        decrementQty: (state, action) => {
            const cartId = action.payload;
            const cartItem = state.find((item) => item.id === cartId);
            if (cartItem && cartItem.qty > 1) {
                cartItem.qty -= 1;
                localStorage.setItem("cart", JSON.stringify([...state]));
            }
        },
    }
});

export const { addToCart, removeFromCart, incrementQty, decrementQty } = cartSlice.actions;
export default cartSlice.reducer;