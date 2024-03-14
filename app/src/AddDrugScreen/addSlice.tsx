import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Price {
    unit: string;
    amount: number;
    price: string;
    symbol: string;
}

export interface Product {
    _id: number,
    img: string | null,
    name: string,
    price: Price,
    NSX: string,
    HSD: string,
    regisNumber: string,
    active: string,
    dosageForms: string,
    pack: string,
    companySX: string,
    companyDK: string,
    countrySX: string,
    countryDK: string,
}

interface Add {
    product : Product | null,
    loading : boolean,
    add : boolean,
}


const INITSTATE : Add = {
    product: null,
    loading:false,
    add: false,
}

const addSlice = createSlice({
    name:'add',
    initialState: INITSTATE,
    reducers : {
        reset: () => INITSTATE,
        setProduct: (state, action : PayloadAction<{product: Product}>) => {
            state.product = action.payload.product;
        },
    },
})

export default addSlice