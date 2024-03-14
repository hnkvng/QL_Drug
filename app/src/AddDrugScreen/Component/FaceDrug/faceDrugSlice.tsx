import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"

interface FaceDrug{
    uri: string | null,
    loading: boolean,
    loadImg: boolean,
}


const INITSTATE : FaceDrug = {
    uri: null,
    loading: false,
    loadImg: false,
}

const faceDrugSlice = createSlice({
    name:'faceDrug',
    initialState: INITSTATE,
    reducers: {
        reset: () => INITSTATE,
        setUri: (state, action : PayloadAction<{ uri: string | null }> ) => {
            state.uri = action.payload.uri;
        },
        setLoadImg: (state, action : PayloadAction<{ loadImg: boolean }>) => {
            state.loadImg = action.payload.loadImg;
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
            .addCase(getFaceImg.rejected, (state, action) => {
                state.loading = false;
            })
    }
})

const getFaceImg = createAsyncThunk(
    'faceDrug/getFaceImg',
    async (callback : any, thunk)  => callback(thunk)

)

export {
    getFaceImg,
}

export default faceDrugSlice;