import { configureStore  } from '@reduxjs/toolkit'
import scanScreenSlice from '../screen/ScanBarScreen/slice'

const store = configureStore({
    reducer: {
        scanScreen: scanScreenSlice.reducer,
    }
})

export default store;