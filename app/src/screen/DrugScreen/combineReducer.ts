import { combineReducers } from "@reduxjs/toolkit";
import menuSelectSlice from "./include/MenuSelect/slice";
import searchDrugSlice from "./include/SearchDrug/slice";


const drugScreenReducer = combineReducers({
    menuSelectSlice: menuSelectSlice.reducer,
    searchDrugSlice: searchDrugSlice.reducer,
})

export default drugScreenReducer;