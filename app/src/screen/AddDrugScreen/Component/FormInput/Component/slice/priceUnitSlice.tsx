import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PriceUnit {
    price: string, 
    unit: string, 
    amount: string,
    indexEdit: number | null,
}

const INITSTATE : PriceUnit = {
    price: '',
    unit: '',
    amount: '',
    indexEdit: null
}

const priceUnitSlice = createSlice({
    name: 'priceUnit',
    initialState: INITSTATE,
    reducers: {
        reset: () => INITSTATE,
        setIndexEdit: (state, action : PayloadAction<number>) => {
            state.indexEdit = action.payload
        },
        setPriceUnit: (state, action : PayloadAction<{price : string, unit : string, amount: string}>) => {
            state.price = action.payload.price;
            state.unit = action.payload.unit;
            state.amount = action.payload.amount;
        },
    }
})

export default priceUnitSlice;