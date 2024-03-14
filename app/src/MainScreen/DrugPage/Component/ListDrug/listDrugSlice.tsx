import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface Items {
    id: number,
    name : string,
    quantity : string,
}


interface ListDrug {
    items : Items[],
    checkItems : boolean[],
    refreshing : boolean,
}

const INITSTATE : ListDrug  = {
    items: [],
    checkItems: [],
    refreshing: false,
}

const listDrugSlice = createSlice({
    name: "listDrug",
    initialState: INITSTATE,
    reducers: {
        reset: () => INITSTATE,
        setListDrug: (state, action : PayloadAction<Items[]>) => {
            state.items = action.payload;
        },
        setCheckItem: (state, action : PayloadAction<boolean[]> ) => {
            state.checkItems = action.payload;
        },
        setRefreshing: (state, action : PayloadAction<boolean>) => {
            state.refreshing = action.payload;
        }
    }
})

export default listDrugSlice;