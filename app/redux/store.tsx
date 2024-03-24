import { configureStore} from "@reduxjs/toolkit";
import rootAddScreenReducer from "../src/screen/AddDrugScreen/combineSlice";
import rootModalReducer from "../src/Component/combineModal";
import { useDispatch } from "react-redux";
import scanBarSlice from "../src/screen/ScanBarCodeScreen/scanBarSlice";
import rootDrugReducer from "../src/screen/MainScreen/DrugPage/combineReducer";
import trushDrugSlice from "../src/screen/TrushDrugScreen/component/ListDrugDeleted/listDrugDeletedSlice";
import rootTrushDrugReducer from "../src/screen/TrushDrugScreen/combineReducer";

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