import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Selection {
    show: boolean,
    loading: boolean,
    uri: string | null
};

const INITSTATE : Selection = {
    show:false,
    loading: false,
    uri: null,
};

const selectionSlice = createSlice({
    name:'selection',
    initialState: INITSTATE,
    reducers: {
        reset: () => INITSTATE,
        setShow: (state,action : PayloadAction<boolean>) => {
            state.show = action.payload;
        },
    },
    extraReducers: (buider) => {
        buider
            .addCase(getFaceImg.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFaceImg.fulfilled, (state, action : PayloadAction<{uri: string}> ) => {
                state.uri = action.payload.uri
                state.loading = false;
            })
            // .addCase(getFaceImg.rejected, (state) => {
            //     state.loading = false;
            // })//Để chỉnh sửa lại sau
    }
});

const getFaceImg = createAsyncThunk(
    'faceDrug/getFaceImg',
    async (callback : any, thunk)  => callback(thunk)
);

export {
    getFaceImg,
};
export default selectionSlice;