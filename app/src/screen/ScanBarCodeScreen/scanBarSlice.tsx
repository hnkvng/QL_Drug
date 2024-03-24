import { createSlice } from "@reduxjs/toolkit";

interface ScanBar {
    controller: 'addScreen' | null,
}

const INITSTATE : ScanBar = {
    controller:null,
}
const scanBarSlicex = createSlice({
    name:'scanBar',
    initialState: INITSTATE,
    reducers: {
        reset: () => INITSTATE,
        setController: (state, action) => {
            state.controller = action.payload;
        }
    }
})
export default scanBarSlicex