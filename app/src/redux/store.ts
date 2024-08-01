import { configureStore  } from '@reduxjs/toolkit'
import scanScreenSlice from '../screen/ScanBarScreen/slice'
import drugScreenReducer from '../screen/DrugScreen/combineReducer';
import componentSpecialRootSlice from '../componentsSpecial/combineReducer';

const store = configureStore({
    reducer: {
        scanScreen: scanScreenSlice.reducer,
        drugScreen: drugScreenReducer,
        componentSpecial: componentSpecialRootSlice,
    }
})

export default store;