import { combineReducers } from "@reduxjs/toolkit";
import NotifiSlice from "./Notification/slice";


const componentSpecialRootSlice = combineReducers({
    notifi: NotifiSlice.reducer
})

export default componentSpecialRootSlice;