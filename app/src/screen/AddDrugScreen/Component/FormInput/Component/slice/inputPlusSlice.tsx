import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface InputPlus {
    listPriceUnit: {price: string, unit: string, amount: string}[],
}

const INITSTATE : InputPlus = {
    listPriceUnit: [],
}

const inputPlusSlice = createSlice({
    name: 'inputPlus',
    initialState: INITSTATE,
    reducers: {
        reset: () => INITSTATE,
        setListPriceUnit: (state, action : PayloadAction<
                {
                    indexEdit: number | null, 
                    value : {price: string, unit: string, amount: string}
                }
            >
        ) => {
            
            if(action.payload.indexEdit !== null) {
                state.listPriceUnit[action.payload.indexEdit] = action.payload.value;
            } else {
                state.listPriceUnit = [...state.listPriceUnit, action.payload.value];
            }
            
        },
        deleteItemListPriceUnit: (state, action) => {
            state.listPriceUnit = state.listPriceUnit.filter((_,index) => index !== action.payload);
        }
    }
})

export default inputPlusSlice;