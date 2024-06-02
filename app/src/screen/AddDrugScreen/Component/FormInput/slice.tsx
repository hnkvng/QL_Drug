import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Input {
    name: string,
    value: string,
}

interface FormInput {
    input: Input[],
};

const INITSTATE : FormInput = {
    input: [],
};

const FormInputSlice = createSlice({
    name: 'formInput',
    initialState: INITSTATE,
    reducers: {
        reset: () => INITSTATE,
        setValue: (state, action : PayloadAction<Input[]>) => {
            state.input = action.payload;
        }
    }
});

export default FormInputSlice;