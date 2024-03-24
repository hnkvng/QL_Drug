import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ItemsDeleted {
    id: number,
    name : string,
}

export interface listDrugDeleted {
    items: ItemsDeleted[],
    checkItems: boolean[],
    refreshing: boolean,
    checkAll: boolean,
}


const INITSTATE : listDrugDeleted = {
    items: [],
    checkItems: [],
    refreshing: false,
    checkAll: false,
}


const listDrugDeletedSlice = createSlice({
    name: "listDrugDeleted",
    initialState: INITSTATE,
    reducers: {
        reset: () => INITSTATE,
        setItemsDeleted: (state, action : PayloadAction<ItemsDeleted[]>) => {
            state.items = action.payload;
        },
        setCheckItemsDeleted: (state, action : PayloadAction<boolean[]>) => {
            state.checkItems = action.payload;
        }, 
        setCheckAll: (state , action : PayloadAction<boolean>) => {
            state.checkAll = action.payload;
        },
        setRefTrush: (state, action : PayloadAction<boolean>) => {
            state.refreshing = action.payload;
        }
    }
})

export default listDrugDeletedSlice;