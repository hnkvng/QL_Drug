import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import rootAddReduce from "../src/screen/AddDrugScreen/combineReducer";



const store = configureStore({
    reducer: {
        add: rootAddReduce
    }
})

export type rootReducer = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;