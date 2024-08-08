import { combineReducers } from "@reduxjs/toolkit";
import notifiSlice from "./Notification/slice";
import cartSlice from "./Cart/slice";


const componentSpecialRootSlice = combineReducers({
    notifi: notifiSlice.reducer,
    cart: cartSlice.reducer,
})

export default componentSpecialRootSlice;