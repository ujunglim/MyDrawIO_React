import { createSlice } from "@reduxjs/toolkit";
import { constants } from "../../Common/constants";

const initialState = {
    size: {
        width: window.innerWidth - constants.PANEL_WIDTH * 2,
        height: window.innerHeight
    }
}

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setSize(state, {payload}) {
            state.size = payload;
        }
    }
})

export const {setSize} = boardSlice.actions;
export const selectBoard = (state) => state.board;
export default boardSlice.reducer;