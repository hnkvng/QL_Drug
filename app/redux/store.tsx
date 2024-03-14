import { configureStore} from "@reduxjs/toolkit";
import rootAddScreenReducer from "../src/AddDrugScreen/combineSlice";
import rootModalReducer from "../modal/combineModal";
import { useDispatch } from "react-redux";
import scanBarSlice from "../src/ScanBarCodeScreen/scanBarSlice";
import rootDrugReducer from "../src/MainScreen/DrugPage/combineReducer";
import trushDrugSlice from "../src/TrushDrugScreen/component/ListDrugDeleted/listDrugDeletedSlice";
import rootTrushDrugReducer from "../src/TrushDrugScreen/combineReducer";

const middlewares : any[] = [
    
];


// if (__DEV__) {
//   const createDebugger = require('redux-flipper').default;
//   middlewares.push(createDebugger());
// }

const store = configureStore({
    reducer: {
        DrugPage: rootDrugReducer,
        AddScreen: rootAddScreenReducer,
        Modal: rootModalReducer,
        Trush: rootTrushDrugReducer,
        Scan: scanBarSlice.reducer,
    }, 
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
})





export type rootReducer = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;