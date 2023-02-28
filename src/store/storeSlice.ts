import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  quantity: number;
  price: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    addItem(state, action) {
      const itemToAdd = action.payload;
      const existingItem = state.items.find((item) => item.id === itemToAdd.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push(itemToAdd);
      }
      state.totalAmount += itemToAdd.price;
    },
    removeItem(state, action) {
      const itemId = action.payload;
      const itemToRemove = state.items.find((item) => item.id === itemId);

      if (itemToRemove && itemToRemove.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== itemId);
        state.totalAmount -= itemToRemove.price;
      } else if (itemToRemove && itemToRemove.quantity > 1) {
        itemToRemove.quantity--;
        state.totalAmount -= itemToRemove.price;
      }
    }
  },
});


export const {addItem, removeItem} = storeSlice.actions;
