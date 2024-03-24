import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface ButtonOptions{
    restore: boolean,
    remove: boolean,
}

type NameButton = 
 | "remove"
 | "restore"

const INITSTATE : ButtonOptions = {
    restore: false,
    remove: false,
}

const buttonOptionSlice = createSlice({
    name: "ButtonOption",
    initialState: INITSTATE,
    reducers: {
        reset: () => INITSTATE,
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