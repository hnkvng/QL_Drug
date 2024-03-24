import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface LoadingSlice {
    show: boolean
};

export type typeOfLoading = LoadingSlice;

const INITSTATE : LoadingSlice = {
    show:false,
};

const loadingSlice = createSlice({
    name:'loading',
    initialState: INITSTATE,
    reducers: {
        reset: () => INITSTATE,
        setShow: (state, action : PayloadAction<boolean>) => {
            state.show = action.payload;
        }
    }
})
export default loadingSlice;