import React from "react";
import store  from "../redux/store";

export type ComponentJSX = React.JSX.Element;
export type ComponentProps<P> = React.FC<P>;
export type EventCHangeHandler = React.ChangeEventHandler<HTMLInputElement>;
export type EventChangeType = React.ChangeEvent<HTMLInputElement>;
export type EventClickType =  React.MouseEvent<HTMLDivElement, MouseEvent>;
export type rootReducer = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type InputModeType = "none" | "decimal" | "email" | "numeric" | "search" | "tel" | "text" | "url";
export type TableName = "Drug" | "Price";
export type sortData = "ASC" | "DESC";
export type propsNameIcon = 'sort-ascending' | 'sort-descending';
export type detailScreenParam = {
    id: number;
}
export type addScreenParam =  {
    MST?: number,
    title: string,
    nameButton: "Thêm" | "Thay đổi"
};
export type PriceItem = {
    giaBan: string,
    donVi: string,
    soLuong: number,
};
export type DrugItem = {
    avatar: string,
    MST: number;
    tenThuoc: string;
    NSX: string,
    HSD: string,
};

export type DrugDetailItem = {
    huongDanSuDung: string,
    soDangKy: string,
    hoatChat: string,
    nongDo: string,
    baoChe: string,
    dongGoi: string,
    tuoiTho:string,
    congTySx: string,
    nuocSx: string,
    diaChiSx: string,
    congTyDk: string,
    nuocDk: string,
    diaChiDk: string,
    nhomThuoc: string,
}

export type Mesage = {
    icon: string,
    color: string,
    message: string
}