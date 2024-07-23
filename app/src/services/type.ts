import React from "react";
import store  from "../redux/store";

export type ComponentJSX = React.JSX.Element;
export type ComponentProps<P> = React.FC<P>;
export type EventCHangeHandler = React.ChangeEventHandler<HTMLInputElement>;
export type EventChangeType = React.ChangeEvent<HTMLInputElement>;
export type EventClickType =  React.MouseEvent<HTMLDivElement, MouseEvent>;
export type rootReducer = ReturnType<typeof store.getState>;
export type InputModeType = "none" | "decimal" | "email" | "numeric" | "search" | "tel" | "text" | "url"
export type sortData = "ASC" | "DESC";
export type propsNameIcon = 'sort-ascending' | 'sort-descending';
export type PriceItem = {
    giaBan: string,
    donVi: string,
    soLuong: number,
}
export type DrugItem = {
    avatar: string,
    soDangKy: string,
    MST: number;
    tenThuoc: string;
    NSX: string,
    HSD: string,
}

export type Error = {
    message: string
}