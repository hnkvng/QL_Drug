import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface MenuDrug {
    option: string | null,
    show: boolean,
}

const INITSTATE : MenuDrug  = {
    option: null,
    show: false,
}

const menuSlice = createSlice({
    name: "Menu",
    initialState: INITSTATE,
    reducers: {
        reset: () => INITSTATE,
        setShowOption: (state, action : PayloadAction<boolean>) => {
            state.show = action.payload;
        },
        setOption: (state, action : PayloadAction<string | null>) => {
            state.option = action.payload;
        },
    }
})

export default menuSlice;