import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface scanScreenSlice {
    code: string,
}

const INITIALSTATE : scanScreenSlice = {
    code: "",
}

const scanScreenSlice = createSlice({
    name: "scanScreen",
    initialState: INITIALSTATE,
    reducers: {
        reset: () => INITIALSTATE,
        setCode: (state, action : PayloadAction<string>) => {
            state.code = action.payload;
        }
    }
})

export default scanScreenSlice;
