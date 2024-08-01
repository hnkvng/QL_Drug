import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Mesage } from "../../services/type";
import { Database } from "../../services/db";
import { FormDrug, FormPrice } from "../../services/interface";
import { MESSAGE, STATUS } from "../../services/config";


interface NotifiSlice {
    show: boolean,
    icon: string | undefined,
    message: string,
    color: string,
    loading: boolean,
}

const INITIALSTATE : NotifiSlice = {
    show: false,
    icon: undefined,
    message: '',
    color: 'black',
    loading: false
}


const NotifiSlice = createSlice({
    name: 'notifi',
    initialState: INITIALSTATE,
    reducers: {
        reset: () => INITIALSTATE,
        setShow: (state, action : PayloadAction<boolean>) => {
            state.show = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(handleAddDrug.pending, (state) => {
                const {icon, color} = MESSAGE.default;

                state.loading = true;
                state.message = MESSAGE.addInfoDrug.loading;
                state.icon = icon;
                state.color = color;
            })
            .addCase(handleAddDrug.fulfilled, (state, action : PayloadAction<Mesage>) => {
                const {message, icon, color} = action.payload;

                state.loading = false;
                state.message = message;
                state.color = color;
                state.icon = icon
            })
            .addCase(handleAddDrug.rejected, (state, action) => {
                const {message, icon, color} = action.payload as Mesage;
                state.loading = false;
                state.message = message;
                state.icon = icon;
                state.color = color; 
            })
            .addCase(handleUpdateDrug.pending, (state) => {
                const {icon, color} = MESSAGE.default;

                state.loading = true;
                state.message = MESSAGE.updateInfoDrug.loading;
                state.icon = icon;
                state.color = color;
            })
            .addCase(handleUpdateDrug.fulfilled, (state, action : PayloadAction<Mesage>) => {
                const {message, icon, color} = action.payload;

                state.loading = false;
                state.message = message;
                state.color = color;
                state.icon = icon;
            })
            .addCase(handleUpdateDrug.rejected, (state, action) => {
                const {message, icon, color} = action.payload as Mesage;
                state.loading = false;
                state.message = message;
                state.icon = icon;
                state.color = color; 
            })
            .addCase(handleDeleteDrug.pending, (state) => {
                const {icon, color} = MESSAGE.default;
                
                state.loading = true;
                state.message = MESSAGE.updateInfoDrug.loading;
                state.icon = icon;
                state.color = color;
            })
            .addCase(handleDeleteDrug.fulfilled, (state, action : PayloadAction<Mesage>) => {
                const {message, icon, color} = action.payload;

                state.loading = false;
                state.message = message;
                state.color = color;
                state.icon = icon
            })
            .addCase(handleDeleteDrug.rejected, (state, action) => {
                const {message, icon, color} = action.payload as Mesage;
                state.loading = false;
                state.message = message;
                state.icon = icon;
                state.color = color; 
            })
    }
})

export const handleAddDrug = createAsyncThunk('notifi/handleAddDrug', async (item : 
    {
        formDrug: FormDrug,
        resetForm: () => void
    }, {rejectWithValue}) => {
    const {formDrug, resetForm} = item;
    try {
        const res = await new Database().addInfoDrug(formDrug)
        resetForm();
        return res;
    } catch (error) {
        return rejectWithValue(error as Mesage)
    }
})

export const handleUpdateDrug = createAsyncThunk('notifi/handleUpdateDrug', async (item : 
    {
        id: number, 
        soDangKyInit: string,
        giaBanInit: FormPrice[], 
        formDrug: FormDrug, 
        goBack: () => void
    }, {rejectWithValue}) => {
    const {id, soDangKyInit, giaBanInit, formDrug, goBack} = item;
    try {
        const res = await new Database().updateInfoDrug(id, soDangKyInit, giaBanInit, formDrug);
        goBack();
        return res;
    } catch (error) {
        return rejectWithValue(error as Mesage)
    }
})

export const handleDeleteDrug = createAsyncThunk('notifi/handleDeleteDrug', async (item: 
    {
        id: number,
        refresh: () => void,
    }, {rejectWithValue}) => {
    
    const {id, refresh} = item;
    try {
        const res = await new Database().deleteItemDrug(id);
        refresh();
        return res;
    } catch (error) {
        return rejectWithValue(error as Mesage)
    }
})

export default NotifiSlice;