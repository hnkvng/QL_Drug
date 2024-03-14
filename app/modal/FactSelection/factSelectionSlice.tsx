import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface FactSelection {
    show: boolean,
    choose: boolean,
    nameAction: string | null,
    typeAction: string | null,
}

const INITSTATE : FactSelection = {
    show: false,
    choose: false,
    nameAction: null,
    typeAction: null,
}

const factSelectionSlice = createSlice({
    name:'factSelection',
    initialState: INITSTATE,
    reducers: {
        reset: () => INITSTATE,
        setShow: (state, action : PayloadAction<{show: boolean, nameAction: string | null, typeAction: string | null}>) => {
            state.show = action.payload.show;
            state.nameAction = action.payload.nameAction;
            state.typeAction = action.payload.typeAction;
        },
        setChoose: (state, action : PayloadAction<boolean> ) => {
            state.choose = action.payload;
        }
    }
})

export default factSelectionSlice ;