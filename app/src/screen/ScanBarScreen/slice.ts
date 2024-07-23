import { Action, PayloadAction, createSlice } from "@reduxjs/toolkit";


const INITSTATE = {
    code: "",
}


const scanScreenSlice = createSlice({
    name: "scanScreen",
    initialState: INITSTATE,
    reducers: {
        reset: () => INITSTATE,
        setCode: (state, action : PayloadAction<string>) => {
            state.code = action.payload;
        }
    }
})

export default scanScreenSlice;
