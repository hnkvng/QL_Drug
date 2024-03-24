import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface ButtonOption{
    show: boolean,
    close: boolean,
    remove: boolean,
}

type NameButton = 
 | "remove"
 | "close"

const INITSTATE : ButtonOption = {
    show: false,
    close: false,
    remove: false,
}

const buttonOptionSlice = createSlice({
    name: "ButtonOption",
    initialState: INITSTATE,
    reducers: {
        reset: () => INITSTATE,
        setShow: (state, action : PayloadAction<boolean>) => {
            state.show = action.payload;
        },
        setButton: (state, action : PayloadAction<{name: NameButton, click: boolean}>) => {
            switch (action.payload.name) {
                case "close":
                    state.close = action.payload.click;
                    break;
                case "remove":      
                    state.remove = action.payload.click;
                    break;
            }
        },
    }
})

export default buttonOptionSlice;