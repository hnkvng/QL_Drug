import { createSlice } from "@reduxjs/toolkit";

interface MenuSelectSlice {
    checkAll: boolean
    checkNotExpired: boolean,
    checkNearExpired: boolean,
    checkExpired: boolean,
}

const INITIALSTATE : MenuSelectSlice = {
    checkAll: true,
    checkNotExpired: true,
    checkNearExpired: true,
    checkExpired: true,
}

const menuSelectSlice = createSlice({
    name: 'menuSelect',
    initialState: INITIALSTATE,
    reducers: {
        reset: () => INITIALSTATE,
        setCheckAll: (state) => {
            state.checkAll = !state.checkAll;
            state.checkExpired = state.checkAll;
            state.checkNearExpired = state.checkAll;
            state.checkNotExpired = state.checkAll;
        },
        setCheckNotExpired: (state) => {
            state.checkNotExpired = !state.checkNotExpired
            if(state.checkAll) {
                state.checkAll = false;
            }
        },
        setCheckNearExpired: (state) => {
            state.checkNearExpired = !state.checkNearExpired
            if(state.checkAll) {
                state.checkAll = false;
            }
        },
        
        setCheckExpired: (state) => {
            state.checkExpired = !state.checkExpired
            if(state.checkAll) {
                state.checkAll = false;
            }
        },
    }
})

export default menuSelectSlice;