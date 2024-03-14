import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export type Status =
 | "default"
 | "success"
 | "warning"  
 | "error"

interface Message {
    text: string | null,
    theme: string,
    iconName: string | null,
}

export interface Inform {
    text: string,
    status : Status,
}

interface NotifiSlice {
    show : boolean,
    text : string | null,
    theme : string,
    iconName : string | null,
}

const INITSTATE : NotifiSlice = {
    show:false,
    text:null,
    theme:'white',
    iconName:null,
}

const notifiSlice = createSlice({
    name:'notifi',
    initialState: INITSTATE,
    reducers: {
        reset: () => INITSTATE,
        setShow: (state, action : PayloadAction<{ show : boolean, text : string | null, iconName : string | null, theme : string}>) => {
            state.show = action.payload.show;
            state.text = action.payload.text;
            state.iconName = action.payload.iconName;
            state.theme = action.payload.theme;
        }
    }
})




export const tempNotifi = (text: string, type : Status) : Message  => {
    const message : Message = {
        text: null,
        theme: 'white',
        iconName: null,
    };

    message.text = text;

    switch (type) {
        case "success":
            message.theme = 'green';
            message.iconName = 'check-circle';
            break;
        case "warning":  
            message.theme = 'yellow';
            message.iconName = 'alert-circle';
            break;
        case "error":
            message.theme = 'red';
            message.iconName = 'alpha-x-circle';
            break;
        default:
            break;
    }
    return message; 
}


export default notifiSlice