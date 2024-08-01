import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchSlice {
    search: string
}

const INITIALSTATE : SearchSlice = {
    search: ''
}


const SearchDrugSlice = createSlice({
    name: 'searchDrug',
    initialState: INITIALSTATE,
    reducers: {
        reset: () => INITIALSTATE,
        setSearch: (state, action : PayloadAction<string>) => {
            state.search = action.payload;
        }
    }
})

export default SearchDrugSlice;