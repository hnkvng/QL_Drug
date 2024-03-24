import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface ItemWantAction {
    id: number[],
    action:
    | 'default' 
    | 'restore'
    | 'remove',
}

export interface TrushDrug {
    want: ItemWantAction,
}



const INITSTATE : TrushDrug = {
    want: {
        id: [],
        action: "default"
    }
}


const trushDrugSlice = createSlice({
    name: "trushDrug",
    initialState: INITSTATE,
    reducers: {
        reset: () => INITSTATE,
        setWantAction: (state, action : PayloadAction<ItemWantAction>) => {
            state.want = action.payload;
        },
    }
})

export default trushDrugSlice;