import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface cartSlice {
    listItem: {
        id: number,
        avatar: string,
        tenThuoc: string, 
        giaBan: string,
        soLuong: number,
        donVi: string,
        heSo: number,
    }[],
}


const INITIALSTATE : cartSlice = {
    listItem: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: INITIALSTATE,
    reducers: {
        reset: () => INITIALSTATE,
        setListItem: (state, action : PayloadAction<{
            id: number,
            avatar: string,
            tenThuoc: string,
            donVi: string,
            giaBan: string,
            heSo: number,
        }>) => {
            const {id, avatar, tenThuoc, donVi, giaBan, heSo} = action.payload;
            const index = state.listItem.findIndex((item) => item.id === id && item.donVi === donVi)
            if(index !== -1) {
                state.listItem[index].soLuong += 1;
            } else {
                state.listItem.push({
                    id: id,
                    avatar: avatar,
                    tenThuoc: tenThuoc,
                    donVi: donVi,
                    soLuong: 1,
                    heSo: heSo,
                    giaBan: giaBan
                })
            }
        },
        dropItem: (state, action : PayloadAction<{id : number, donVi: string}>) => {
            const {id, donVi} = action.payload;
            state.listItem = state.listItem.filter((item) => !(item.id === id && item.donVi === donVi));
        },
        setSoLuong: (state, action : PayloadAction<{index: number, soLuong: number}>) => {
            const {index, soLuong} = action.payload;
    
            state.listItem[index] = {...state.listItem[index], soLuong: soLuong};
        },
    }
})

export default cartSlice;