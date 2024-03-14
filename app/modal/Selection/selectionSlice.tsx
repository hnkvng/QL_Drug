import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Selection {
    show: boolean,
    choose:string | null,
    controller:string | null,
}

const INITSTATE : Selection = {
    show:false,
    choose:null,
    controller:null,
}

const selectionSlice = createSlice({
    name:'selection',
    initialState: INITSTATE,
    reducers: {
        reset: () => INITSTATE,
        setShow: (state,action : PayloadAction<{controller: string | null, show : boolean}>) => {
            state.controller = action.payload.controller
            state.show = action.payload.show;
        },
        setChoose: (state, action : PayloadAction<string | null> ) => {
            state.choose = action.payload
        }
    }
})

export default selectionSlice;