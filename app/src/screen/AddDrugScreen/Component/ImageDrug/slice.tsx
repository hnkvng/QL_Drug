import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ImageDrug {
    img: string | null,
    loading: boolean,
};

const INITSTATE : ImageDrug = {
    img: null,
    loading: false,
};

const imageDrugSlice = createSlice({
    name: 'imageDrug',
    initialState: INITSTATE,
    reducers: {
        reset: () => INITSTATE,
        setImgNull: (state) => {
            state.img = '';
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getImg.pending, (state) => {
                state.loading = true;
            })
            .addCase(getImg.fulfilled, (state, action) => {
                state.loading = false;
                if(action.payload) {
                    state.img = action.payload.uri;
                }
                
            })
            .addCase(getImg.rejected, (state, action) => {
                state.loading = false;
                console.log(action.payload)
            })
    }
});

const getImg = createAsyncThunk(
    'imageDrug/getImg', 
    async (callback : any, thunk)  => callback(thunk)
);

export {
    getImg
};

export default imageDrugSlice;