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


const notifiSlice = createSlice({
    name: 'notifi',
    initialState: INITIALSTATE,
    reducers: {
        reset: () => INITIALSTATE,
        setShow: (state, action : PayloadAction<boolean>) => {
            state.show = action.payload;
        },
        handleSusscess: (state, action : PayloadAction<string>) => {
            const {icon, color} = STATUS.susscess;
            state.show = true;
            state.message = action.payload;
            state.icon = icon;
            state.color = color;
        },
        handleWarn: (state, action : PayloadAction<string>) => {
            const {icon, color} = STATUS.warning;
            state.show = true;
            state.message = action.payload;
            state.icon = icon;
            state.color = color;
        },
        handleError: (state) => {
            const {icon, color, message} = MESSAGE.error;
            state.show = true;
            state.message = message;
            state.icon = icon;
            state.color = color;
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
            .addCase(handleAddOrReduce.pending, (state) => {
                const {icon, color} = MESSAGE.default;
                
                state.loading = true;
                state.message = MESSAGE.addOrReduceDrug.loading;
                state.icon = icon;
                state.color = color;
            })
            .addCase(handleAddOrReduce.fulfilled, (state, action : PayloadAction<Mesage>) => {
                const {message, icon, color} = action.payload;

                state.loading = false;
                state.message = message;
                state.color = color;
                state.icon = icon
            })
            .addCase(handleAddOrReduce.rejected, (state, action) => {
                const {message, icon, color} = action.payload as Mesage;

                state.loading = false;
                state.message = message;
                state.icon = icon;
                state.color = color; 
            })
            .addCase(handleSell.pending, (state) => {
                const {icon, color} = MESSAGE.default;
                
                state.loading = true;
                state.message = MESSAGE.sellDrug.loading;
                state.icon = icon;
                state.color = color;
            })
            .addCase(handleSell.fulfilled, (state, action : PayloadAction<Mesage>) => {
                const {message, icon, color} = action.payload;

                state.loading = false;
                state.message = message;
                state.color = color;
                state.icon = icon
            })
            .addCase(handleSell.rejected, (state, action) => {
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
        const db = await new Database();
        await db.onPragma();
        const res = await db.addInfoDrug(formDrug)
        resetForm();
        return res;
    } catch (error) {
        return rejectWithValue(error as Mesage)
    }
})

export const handleUpdateDrug = createAsyncThunk('notifi/handleUpdateDrug', async (item : 
    {
        MSTInit: number, 
        soDangKyInit: string,
        formDrug: FormDrug, 
        goBack: () => void
    }, {rejectWithValue}) => {
    const {MSTInit, soDangKyInit, formDrug, goBack} = item;
    try {
        const db = await new Database();
        await db.onPragma();
        const res = await db.updateInfoDrug(MSTInit, soDangKyInit, formDrug);
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
        const db = await new Database();
        await db.onPragma();
        const res = await db.deleteItemDrug(id);
        refresh();
        return res;
    } catch (error) {
        return rejectWithValue(error as Mesage)
    }
})

export const handleAddOrReduce = createAsyncThunk('notifi/handleAddOrReduce', async (item: 
    {
        MST: number,
        soLuong: number,
        soLuongTonKho: number,
        addOrReduce: 'Thêm' | "Bớt",
        resetForm: () => void
    }, {rejectWithValue}) => {
    
    const {MST, soLuong, soLuongTonKho, addOrReduce, resetForm} = item;
    try {
        const db = await new Database();
        const res = await db.addOrReduceDrug(soLuong, soLuongTonKho, addOrReduce, MST);
        resetForm();
        return res;
    } catch (error) {
        return rejectWithValue(error as Mesage)
    }
})

export const handleSell = createAsyncThunk('notifi/handleSell', async (item: 
    {
        lisCart: {
            id: number,
            avatar: string,
            tenThuoc: string, 
            giaBan: string,
            soLuong: number,
            donVi: string,
            heSo: number,
        }[],
        tongTien: number,
        resetCart: () => void,
    }, {rejectWithValue}) => {
    const {lisCart,tongTien, resetCart} = item;

    try {
        const db = await new Database();
        const res = await db.sellDrug(lisCart, tongTien);
        resetCart();
        return res;
    } catch (error) {
        return rejectWithValue(error as Mesage)
    }
})


export default notifiSlice;