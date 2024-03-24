import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"

interface FaceDrug{
    uri: string | null,
}


const INITSTATE : FaceDrug = {
    uri: null,
}

const faceDrugSlice = createSlice({
    name:'faceDrug',
    initialState: INITSTATE,
    reducers: {
        reset: () => INITSTATE,
        setUri: (state, action : PayloadAction<{ uri: string | null }> ) => {
            state.uri = action.payload.uri;
        },
    },
})

export default faceDrugSlice;