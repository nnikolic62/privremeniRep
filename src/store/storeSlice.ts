import { createSlice } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  quantity: number;
  name: string;
  price: number;
  img: string;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
}

const initialState: CartState = {
  items: localStorage.getItem('cart') == null ? [] : JSON.parse(localStorage.getItem('cart') as string),
  totalAmount: localStorage.getItem('total') == null ? 0 : JSON.parse(localStorage.getItem('total') as string),
};

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    addItem(state, action) {
      const itemToAdd: CartItem = action.payload;
      const existingItem = state.items.find((item) => item.id === itemToAdd.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push(itemToAdd);
      }
      state.totalAmount += itemToAdd.price;
      localStorage.setItem('cart', JSON.stringify(state.items));
      localStorage.setItem('total', JSON.stringify(state.totalAmount));
    },
    removeSingleItem(state, action) {
      const itemId: number = action.payload;
      const itemToRemove = state.items.find((item) => item.id === itemId);

      if (itemToRemove && itemToRemove.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== itemId);
        state.totalAmount -= itemToRemove.price;
      } else if (itemToRemove && itemToRemove.quantity > 1) {
        itemToRemove.quantity--;
        state.totalAmount -= itemToRemove.price;
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
      localStorage.setItem('total', JSON.stringify(state.totalAmount));
    },
    removeItem(state, action) {
      const itemId = action.payload;
      const itemToRemove = state.items.find((item) => item.id === itemId);

      state.items = state.items.filter((item) => item.id !== itemId);
      state.totalAmount = state.totalAmount - (itemToRemove!.price * itemToRemove!.quantity);
      localStorage.setItem('cart', JSON.stringify(state.items));
      localStorage.setItem('total', JSON.stringify(state.totalAmount));
    },
  },
});

export const { addItem, removeSingleItem, removeItem } = storeSlice.actions;
