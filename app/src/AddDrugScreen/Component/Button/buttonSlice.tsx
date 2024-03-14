// import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// interface ButtonSlice {
//     clear : boolean,
//     submit : boolean,
// }

// const INTISTATE : ButtonSlice = {
//     clear:false,
//     submit: false,
// }

// const buttonSlice = createSlice({
//     name:'buttonAdd',
//     initialState: INTISTATE,
//     reducers: {
//         reset: () => INTISTATE,
//         setButtonClear: (state, action : PayloadAction<boolean>) => {
//             state.clear = action.payload;
//         },
//         setButtonSubmit: (state, action : PayloadAction<boolean>) => {
//             state.submit = action.payload;
//         }
//     }
// })
// export default buttonSlice;