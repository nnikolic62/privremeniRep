import { createSlice } from "@reduxjs/toolkit";

export interface DialogState {
    visible: boolean;
}

const initialState: DialogState = {
    visible: false
}

export const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        toggle(state){
            state.visible = !state.visible
        }
    }
})

export const {toggle} = dialogSlice.actions