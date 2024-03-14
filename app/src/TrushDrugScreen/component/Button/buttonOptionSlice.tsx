import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface ButtonOptions{
    show: boolean,
    restore: boolean,
    remove: boolean,
}

type NameButton = 
 | "remove"
 | "restore"

const INITSTATE : ButtonOptions = {
    show: false,
    restore: false,
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
                case "restore":
                    state.restore = action.payload.click;
                    break;
                case "remove":      
                    state.remove = action.payload.click;
                    break;
            }
        },
    }
})

export default buttonOptionSlice;