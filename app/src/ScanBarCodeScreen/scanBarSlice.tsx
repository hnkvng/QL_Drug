import { createSlice } from "@reduxjs/toolkit";

interface ScanBar {
    code: string | null,
    controller: string | null,
}

const INITSTATE : ScanBar = {
    code:null,
    controller:null,
}
const scanBarSlicex = createSlice({
    name:'scanBar',
    initialState: INITSTATE,
    reducers: {
        reset: () => INITSTATE,
        setCode: (state, action) => {
            state.code = action.payload;
        },
        setController: (state, action) => {
            state.controller = action.payload;
        }
    }
})
export default scanBarSlicex