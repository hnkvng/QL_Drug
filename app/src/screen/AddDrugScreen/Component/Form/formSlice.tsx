import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchApiData } from "../../../../../api/helpers";
import { searhNameDrug } from "../../../../../api/getApi";


export interface OutData {
    regisNumber: string,
    active: string,
    dosageForms: string,
    pack: string,
    companySX: string,
    companyDK: string,
    countrySX: string,
    countryDK: string,
};

interface Form {
    data: Object[],
    outData: OutData[],
    selectData: OutData,
    loading: boolean,  
};

const INITSTATE : Form = {
    data: [],
    outData: [],
    selectData: {
        regisNumber: '',
        active: '',
        dosageForms: '',
        pack: '',
        companySX: '',
        companyDK: '',
        countrySX: '',
        countryDK: '',
    },
    loading: false,
};

const formInputSlice = createSlice({
    name:' formInput',
    initialState: INITSTATE,
    reducers: {
        reset: () => INITSTATE,
        setData: (state, action : PayloadAction<OutData>) => {
            state.selectData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSearchDrug.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSearchDrug.fulfilled, (state , action) => {
                state.loading = false;
                state.data = action.payload.map((item: any, key: any)=> ({
                    label: item.tenThuoc,
                    value: key
                }))
                state.outData = action.payload.map((item : any)=> ({
                    regisNumber: item.soDangKy,
                    active: item.hoatChat,
                    dosageForms: item.baoChe,
                    pack: item.dongGoi,
                    companySX: item.congTySx,
                    companyDK: item.congTyDk,
                    countrySX: item.nuocSx,
                    countryDK: item.nuocDk,
                } as OutData))
            })
            .addCase(getSearchDrug.rejected, (state , action) => {
                state.loading = false;
                // console.log(action.payload);
            });
    }
});

export const getSearchDrug = createAsyncThunk(
    'formInput', 
    async (data : string, Thunk? : any) => fetchApiData(searhNameDrug, data,Thunk)
);

export default formInputSlice;