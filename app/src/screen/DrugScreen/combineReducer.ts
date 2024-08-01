import { combineReducers } from "@reduxjs/toolkit";
import MenuSelectSlice from "./include/MenuSelect/slice";
import SearchDrugSlice from "./include/SearchDrug/slice";


const drugScreenReducer = combineReducers({
    menuSelectSlice: MenuSelectSlice.reducer,
    searchDrugSlice: SearchDrugSlice.reducer,
})

export default drugScreenReducer;