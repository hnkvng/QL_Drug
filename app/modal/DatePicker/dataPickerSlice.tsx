import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface DataPickerState {
    show: boolean,
}

export type typeOfDatePicker = DataPickerState

const INITSTATE : DataPickerState = {
    show:false,
}

const datePickerSlice = createSlice({
    name:'date',
    initialState: INITSTATE,
    reducers: {
        reset: () => INITSTATE,
        setShow: (state, action : PayloadAction<{ show : boolean}>) => {
            state.show = action.payload.show;
        },
    }
})

export default datePickerSlice;