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

const detailDrugSlice = createSlice({
    name:'detailDrug',
    initialState: INITSTATE,
    reducers: {
        reset: () => INITSTATE,
        setUri: (state, action : PayloadAction<{ uri: string | null }> ) => {
            state.uri = action.payload.uri;
        },
    },
})

export default detailDrugSlice;